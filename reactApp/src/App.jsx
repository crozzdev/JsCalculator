import "./App.css";
import { Screen } from "./components/Screen";
import { Keyboard } from "./components/Keyboard";
import { useState } from "react";

function App() {
  const [formulaTotal, setFormulaTotal] = useState("");
  const [inputScreen, setInputScreen] = useState("0");

  const showLimitNum = () => {
    const prev = inputScreen;
    setInputScreen("DIGIT LIMIT MET");
    setTimeout(() => {
      setInputScreen(prev);
    }, 1000);
  };

  const operatorClick = (event) => {
    const btnValue = event.target.value;
    const endsWithOperator = /[-+*/]$/.test(formulaTotal);
    const endsWithOperatorandMinus = /[*/+]-$/.test(formulaTotal);
    const endsWithDoubleMinus = /--$/.test(formulaTotal);
    const isMinusClicked = btnValue === "-";
    const isEqpresent = formulaTotal.includes("=");

    if (endsWithDoubleMinus) {
      return; // Prevent adding more than two consecutive minus signs
    }

    if (isEqpresent) {
      const prevResult = formulaTotal.split("=")[1];
      setFormulaTotal(prevResult + btnValue);
      setInputScreen(btnValue);
      return;
    }

    if (endsWithOperatorandMinus && !isMinusClicked) {
      // Replace the last two characters (operator and minus) with the new operator
      setFormulaTotal(formulaTotal.slice(0, -2) + btnValue);
    } else if (endsWithOperatorandMinus && isMinusClicked) {
      return; // Do nothing if another minus is clicked after an operator and minus
    } else if (endsWithOperator) {
      if (isMinusClicked) {
        // Allow the minus sign to be added after another operator
        setFormulaTotal(formulaTotal + btnValue);
      } else {
        // Replace the last operator with the new one (excluding the minus sign)
        setFormulaTotal(formulaTotal.slice(0, -1) + btnValue);
      }
    } else {
      // Append the operator if there's no trailing operator
      setFormulaTotal(formulaTotal + btnValue);
    }

    setInputScreen(btnValue);
  };

  const numClick = (event) => {
    const value = event.target.value;
    const startsWithZero = /^(0$|.*[-+*/]0$)/.test(inputScreen);
    const isDecimalBtn = value === ".";
    const isDecimalPresent = inputScreen.includes(".");
    const isEqpresent = formulaTotal.includes("=");
    const endsWithOperator = /[-+*/]$/.test(inputScreen);

    if (inputScreen.length >= 22) {
      showLimitNum();
      return;
    }

    if (isEqpresent) {
      if (isDecimalBtn) {
        setInputScreen("0" + value);
        setFormulaTotal("0" + value);
        return;
      }
      setFormulaTotal(value);
      setInputScreen(value);
      return;
    }

    if (isDecimalBtn && isDecimalPresent) {
      return;
    }

    if (startsWithZero && isDecimalBtn) {
      setInputScreen(inputScreen + value);
      setFormulaTotal(inputScreen + value);
    } else if (startsWithZero && !isDecimalBtn) {
      setInputScreen(value);
      setFormulaTotal(value);
    } else if (endsWithOperator && isDecimalBtn) {
      setInputScreen("0" + value);
      setFormulaTotal(formulaTotal + "0" + value);
    } else if (endsWithOperator && !isDecimalBtn) {
      setInputScreen(value);
      setFormulaTotal(formulaTotal + value);
    } else {
      setInputScreen(inputScreen + value);
      setFormulaTotal(formulaTotal + value);
    }
  };

  const clearClick = () => {
    setFormulaTotal("");
    setInputScreen("0");
  };

  const eqClick = () => {
    let formula = formulaTotal.replace(/--/g, "+");
    const calculation = eval(formula);
    setFormulaTotal((prev) => prev + "=" + calculation);
    setInputScreen(`${calculation}`);
  };

  return (
    <div className="app">
      <Screen
        id="formulaTotal"
        className="formulaScreen"
        valueToDisplay={formulaTotal}
      />
      <Screen
        id="display"
        className="outputScreen"
        valueToDisplay={inputScreen}
      />
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
