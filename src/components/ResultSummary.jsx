import { useEffect, useState } from "react";
import { useGlobalStore } from "../store/useGlobalStore";
import Loading from "./Loading";
import currencies from '../data/currencies.json';
import { loadConversionRate } from "../data/api";

const ResultSummary = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(undefined);
    const convertFrom = useGlobalStore(state => state.convertFrom);
    const convertTo = useGlobalStore(state => state.convertTo);
    const amount = useGlobalStore(state => state.amount);

    useEffect(() => {
        setLoading(true);
        loadConversionRate().then(data => {
            setLoading(false);
            if(data.error) {
                setError(data.error.toString());
            } else {
                setResult(data.data);
            }
        }).catch(e  => {
            setLoading(false);
            setError("check your internet connection");
            console.log(e.toString());
        })
    }, [convertFrom, convertTo, amount]);

    function reverseConversion() {
       return amount * result.conversion_rates[convertFrom] / result.conversion_rates[convertTo];
    }

    function conversion() {
        return amount * result.conversion_rates[convertTo] / result.conversion_rates[convertFrom];

    }

    function formatDate() {
        // Sat, 28 Mar 2020 00:00:00 +0000
        return result.time_last_update_utc.substring(0, result.time_last_update_utc.lastIndexOf(':')) + " UTC"
    }

    if (loading) {
        return (
            <Loading sizeClass={'w-2 h-2'} />
        )
    }
    if (error !== '') {
        return (
            <span> {error} </span>
        )
    }
    if (result) {
        return (
            <div className="flex md:flex-row flex-col justify-between dark:text-white text-[8px] font-bold w-10/12">
                <div className="flex flex-col">
                    <span> {amount} {currencies[convertFrom].currency_name} = </span>
                    <span className="text-base"> {conversion()} {currencies[convertTo].currency_name} </span>
                    <span> {amount} {currencies[convertTo].currency_name} = {reverseConversion()} {currencies[convertFrom].currency_name} </span>
                </div>
                <span className="text-wrap"> {currencies[convertFrom].currency_name} to {currencies[convertTo].currency_name} — Last updated {formatDate()} </span>
            </div>
        )
    }
}

export default ResultSummary;
