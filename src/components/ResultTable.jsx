import { useEffect, useState } from "react";
import { useGlobalStore } from "../store/useGlobalStore";
import Loading from "./Loading";
import currencies from '../data/currencies.json';
import { loadConversionRate } from "../data/api";

const ResultTable = () => {
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
            if (data.error) {
                setError(data.error.toString());
            } else {
                setResult(data.data);
            }
        }).catch(e => {
            setLoading(false);
            setError("check your internet connection");
            console.log(e.toString());
        })
    }, [convertFrom, convertTo, amount]);

    function tableAmounts() {
        const fillAmounts = [amount];
        for (let i = 1; i < 9; i++) {
            if (i % 2 === 0) {
                fillAmounts.push(fillAmounts[i - 1] * 2);
            } else {
                fillAmounts.push(fillAmounts[i - 1] * 5);
            }
        }
        return fillAmounts;
    }

    function reverseConversion(val) {
        return val * result.conversion_rates[convertFrom] / result.conversion_rates[convertTo];
    }

    function conversion(val) {
        return val * result.conversion_rates[convertTo] / result.conversion_rates[convertFrom];

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
            <div className="flex md:flex-row flex-col md:justify-between justify-center items-center md:w-10/12 w-full mb-8 font-bold">
                <div className="md:w-5/12">
                    <h1 className="text-2xl leading-10 dark:text-white"> Convert {convertFrom} to {convertTo} </h1>
                    <br />
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-400">
                                <th className="p-4">
                                    <img src={currencies[convertFrom].flag_url} className='rounded-xl w-6 inline' />
                                    <span> {currencies[convertFrom].currency_name} </span>
                                </th>
                                <th className="p-4">
                                    <img src={currencies[convertTo].flag_url} className='rounded-xl w-6 inline' />
                                    <span> {currencies[convertTo].currency_name} </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableAmounts().map((e, i) => (
                                <tr key={i} className="bg-slate-300 text-center text-wrap">
                                    <td className="text-sky-800 p-4"> {e} {currencies[convertFrom].display_symbol} </td>
                                    <td> {conversion(e)} {currencies[convertTo].display_symbol} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="md:w-5/12">
                    <h1 className="text-2xl leading-10 dark:text-white"> Convert {convertTo} to {convertFrom} </h1>
                    <br />
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-400">
                                <th className="p-4">
                                    <img src={currencies[convertTo].flag_url} className='rounded-xl w-6 inline' />
                                    <span> {currencies[convertTo].currency_name} </span>
                                </th>
                                <th className="p-4">
                                    <img src={currencies[convertFrom].flag_url} className='rounded-xl w-6 inline' />
                                    <span> {currencies[convertFrom].currency_name} </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableAmounts().map((e, i) => (
                                <tr key={i} className="bg-slate-300 text-center text-wrap">
                                    <td className="text-sky-800 p-4"> {e} {currencies[convertTo].display_symbol} </td>
                                    <td> {reverseConversion(e)} {currencies[convertFrom].display_symbol} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ResultTable;
