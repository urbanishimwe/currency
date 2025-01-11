import { useGlobalStore } from '../store/useGlobalStore';

const FormHeader = () => {
    const resultType = useGlobalStore(state => state.resultType);
    const setResultType = useGlobalStore(state => state.setResultType);

    function highlightButton(name) {
        if (resultType === name) {
            return "bg-slate-900 text-white h-10 w-32 rounded-3xl text-xs font-bold"
        }

        return "text-xs font-bold"
    }

    function handleClick(e) {
        e.stopPropagation();
        const val = (e.target.textContent || e.target.innerText || "").trim();
        setResultType(val);
    }

    return (
        <div className="bg-white flex flex-row justify-center items-center w-9/12 rounded-2xl">
            <div className="w-1/3 p-4 flex flex-row justify-center items-center">
                <button onClick={handleClick} className={highlightButton('Convert')}> Convert </button>
            </div>
            <div className="w-1/3 p-4 flex flex-row justify-center items-center">
                <button onClick={handleClick} className={highlightButton('Charts')}> Charts </button>
            </div>
            <div className="w-1/3 p-4 flex flex-row justify-center items-center">
                <button onClick={handleClick} className={highlightButton('Alerts')}> Alerts </button>
            </div>
        </div>
    )
}

export default FormHeader;
