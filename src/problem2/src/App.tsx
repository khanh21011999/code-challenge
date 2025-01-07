import "./App.css";
import CurrencySwap from "./components/CurrencySwap";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <>
      <GlobalStyles />
      <div className="App">
        <CurrencySwap />
      </div>
    </>
  );
}

export default App;
