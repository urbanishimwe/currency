import FormBody from "./FormBody";
import FormHeader from "./FormHeader";
import ResultSummary from "./ResultSummary";

const Form = () => {
    return (
        <div className="dark:bg-slate-900 bg-gray-100 flex flex-col justify-center items-center md:w-10/12 w-full p-8 my-8">
            <FormHeader />
            <FormBody />
            <ResultSummary />
        </div>
    )
}

export default Form;
