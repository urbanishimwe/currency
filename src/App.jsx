import { useEffect, useState } from 'react';
import Footer from './components/Footer'
import Form from './components/Form'
import Header from './components/Header'
import IntroHeader from './components/IntroHeader'
import { loadConversionRate } from './data/api';
import Loading from './components/Loading';
import { useGlobalStore } from './store/useGlobalStore';
import ResultTable from './components/ResultTable';

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const resultType = useGlobalStore(state => state.resultType);


  useEffect(() => {
        loadConversionRate().then(data => {
            setLoading(false);
            if(data.error) {
                setError(data.error.toString());
            }
        }).catch(e  => {
            setLoading(false);
            setError("check your internet connection");
            console.log(e.toString());
        })
  }, []);

  if (loading) {
    return (
      <div className='dark:bg-slate-800 bg-white min-h-screen w-svw flex flex-col items-center justify-center'>
        <Loading sizeClass={'w-32 h-32'} />
      </div>
    )
  }
  if (error !== '') {
    return (
      <span> {error} </span>
    )
  }
  return (
    <div className='dark:bg-slate-800 bg-white min-h-screen w-svw flex flex-col items-center justify-between'>
      <Header />
      <IntroHeader />
      <Form />
      {resultType === "Convert" ? <ResultTable/>: <></>}
      <Footer />
    </div>
  )
}

export default App;
