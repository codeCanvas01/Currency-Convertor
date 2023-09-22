import { useState } from "react";
import InputBox from "./components/InputBox";
import useFetchCurrencies from "./hooks/useFetchCurrencies"


  
function App() {
  const [amount,setAmount] = useState(0);
  const [changedFrom,setChangedFrom] = useState('usd');
  const [changedTo,setChangedTo] = useState('pkr');
  const [convertedCurrency,setconvertedCurrency] = useState(0)
  const currencyInfo = useFetchCurrencies(changedFrom)
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setChangedFrom(changedTo);
    setChangedTo(changedFrom);
    setconvertedCurrency(amount);
    setAmount(convertedCurrency);
  }

  const convertion = () => {
      setconvertedCurrency(amount * currencyInfo[changedTo])

  }   
  return (
    <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
            backgroundImage: `url('https://images.pexels.com/photos/8919573/pexels-photo-8919573.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
        }}
    >
        <div className="w-full">
            <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        convertion();
                    }}
                >
                    <div className="w-full mb-1">
                        <InputBox
                            label="From"
                            amount={amount}
                            onAmountChange={(amount)=> setAmount(amount)}
                            currencyOptions = {options}
                            onCurrencyChange = {(currency) => setChangedFrom(currency)}
                            selectCurrency = {changedFrom}
                            
                        />
                    </div>
                    <div className="relative w-full h-0.5">
                        <button
                            type="button"
                            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                            onClick={swap}
                        >
                            swap
                        </button>
                    </div>
                    <div className="w-full mt-1 mb-4">
                        <InputBox
                            label="To"
                            amount={convertedCurrency}
                            currencyOptions = {options}
                            onCurrencyChange = {(currency) => setChangedTo(currency)}
                            selectCurrency = {changedTo}
                            amountDisable 
                            
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg">
                        Convert {changedFrom.toUpperCase()} to {changedTo.toUpperCase()}
                    </button>
                </form>
            </div>
        </div>
    </div>
);
}

export default App;
