import "./App.css";
import { Screen } from "./components/Screen";
import { Keyboard } from "./components/Keyboard";
import { useState } from "react";

function App() {
  const [formulaTotal, setFormulaTotal] = useState("");
  const [inputScreen, setInputScreen] = useState("0");

  const operatorClick = (event) => {
    return;
  };

  const numClick = (event) => {
    return;
  };

  const clearClick = () => {
    return;
  };

  const eqClick = () => {
    return;
  };

  return (
    <div className="app">
      <Screen className="formulaScreen" valueToDisplay={formulaTotal} />
      <Screen className="outputScreen" valueToDisplay={inputScreen} />
      <Keyboard
        className="keyboard"
        operatorClick={operatorClick}
        numClick={numClick}
        eqClick={eqClick}
        clearClick={clearClick}
      />
    </div>
  );
}

export default App;
