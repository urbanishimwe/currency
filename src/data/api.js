import axios from "axios";

const apiKey = import.meta.env.VITE_EXCHANGERATE_API_TOKEN;

// Five minute in milliseconds for axios timeout
const FIVE_MINUTE_MS = 60 * 1000 * 5;

// window local storage cache key
// we don't call Exchangerate api every time since the result won't change until certain period of time.
// we cache result to be reused at some point in the future.
const CONVERSION_RATE_KEY = "conversion_rates";

/* @return { data: Map, error: Error }
*/
export async function loadConversionRate() {
    // make cacheable response for all currencies
    const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const cachedRates = getCachedConversionRates();
    if (cachedRates.time_next_update_unix && cachedRates.time_next_update_unix >= (Date.now() / 1000)) {
        return { data: cachedRates };
    }

    const resp = await axios.get(apiURL, {
        timeout: FIVE_MINUTE_MS,
        headers: {
            'Accept': 'application/json',
        }
    });

    if ([200, 204].includes(resp.status) && resp.data && resp.data.result === "success") {
        cacheConversionRates(resp.data);
        return { data: resp.data };
    }

    switch ((resp.data || {}).result) {
        case "unsupported-code", "unknown-code":
            return { error: new Error('currency selected is not supported!') };
        case "invalid-key", "inactive-account":
            return { error: new Error('credentials not recognized by the system!') }
        case "quota-reached":
            return { error: new Error('sorry, currency system not nice to us at the time!') };
        default:
            return { error: new Error('unknown error occured') };
    }
}

// @return Map
function getCachedConversionRates() {
    return JSON.parse(window.localStorage.getItem(CONVERSION_RATE_KEY) || '{}');
}

function cacheConversionRates(rates) {
    window.localStorage.setItem(CONVERSION_RATE_KEY, JSON.stringify(rates));
}
