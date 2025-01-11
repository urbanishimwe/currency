import currencies from '../data/currencies.json';
import { useGlobalStore } from '../store/useGlobalStore';

const FormBody = () => {
    const convertFrom = useGlobalStore(state => state.convertFrom);
    const convertTo = useGlobalStore(state => state.convertTo);
    const amount = useGlobalStore(state => state.amount);
    const setConvertFrom = useGlobalStore(state => state.setConvertFrom);
    const setConvertTo = useGlobalStore(state => state.setConvertTo);
    const setAmount = useGlobalStore(state => state.setAmount);

    function selectOptions() {
        let options = [];
        for (const key in currencies) {
            const value = currencies[key];
            options.push(
                <option value={key} key={key}>
                    {key} - {value.currency_name}
                </option>
            )
        }
        return options;
    }

    function changeConvertFrom(e) {
        if (currencies[e.target.value]) {
            setConvertFrom(e.target.value);
        }
    }

    function changeConvertTo(e) {
        if (currencies[e.target.value]) {
            setConvertTo(e.target.value);
        }
    }

    return (
        <div className="flex md:flex-row flex-col m-8 justify-between text-xs font-bold">
            <div className="bg-white w-fit rounded-lg m-2 p-2">
                <span> Amount </span>
                <div>
                    <span className='inline '>{currencies[convertFrom].display_symbol} </span>
                    <input className="inline text-xs font-bold w-9/12" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>
            </div>
            <div className="bg-white w-fit rounded-lg p-2 flex flex-col m-2">
                <span> From </span>
                <div>
                    <img src={currencies[convertFrom].flag_url} className='rounded-xl w-6 inline' />
                    <select className="text-xs font-bold w-10/12" defaultValue={convertFrom} onChange={changeConvertFrom}>
                        {selectOptions()}
                    </select>
                </div>
            </div>
            <div className="bg-white w-fit rounded-lg m-2 p-2">
                <span> To </span>
                <div>
                    <img src={currencies[convertTo].flag_url} className='rounded-xl w-6 inline' />
                    <select className="text-xs font-bold w-10/12" defaultValue={convertTo} onChange={changeConvertTo}>
                        {selectOptions()}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FormBody;
