//displays
const $formulaScreenDiv = document.getElementById("formulaScreen");
const $displayDiv = document.getElementById("display");

//buttons
const $clearBtn = document.getElementById("clear");
const $divideBtn = document.getElementById("divide");
const $multiplyBtn = document.getElementById("multiply");
const $addBtn = document.getElementById("add");
const $subtractBtn = document.getElementById("subtract");
const $equalsBtn = document.getElementById("equals");

//numbers
const $keyboardDiv = document.getElementById("keyboard");

let formulaInput = "";
let currentInput = "";

const evalFormula = (formula) => {
  try {
    // Direct evaluation - consider using a safe math library for complex expressions
    const result = eval(formula);
    return result;
  } catch (error) {
    console.error("Error evaluating formula:", error);
    return "Error"; // Return a user-friendly error message or handle as needed
  }
};

const getInput = (event) => {
  const btnValue = event.target.value;
  const isNumberBtn = event.target.className.includes("num-btn");
  const isOperatorBtn = event.target.className.includes("operations-btn");
  const isDecimalBtn = btnValue === ".";
  const endsWithOperator = /[\+\-\*\/]$/.test(formulaInput);
  const endsWithDecimal = /\.$/.test(formulaInput);
  const startsWithZero = /^(0$|.*[\+\-\*\/]0$)/.test(formulaInput);

  if (isNumberBtn || isDecimalBtn) {
    if (isDecimalBtn && currentInput.includes(".")) {
      // If it's a decimal button and currentInput already has a decimal, do nothing
      return;
    } else if (
      startsWithZero &&
      btnValue === "0" &&
      !currentInput.includes(".")
    ) {
      // Prevent adding 0 if it's the first character or if it follows an operator directly, unless there's a decimal point
      return;
    } else if (endsWithOperator || currentInput === "") {
      if (isDecimalBtn) {
        currentInput = "0."; // Start with "0." for decimal if currentInput is empty
      } else {
        currentInput = btnValue; // Start fresh for numbers after an operator
      }
    } else {
      currentInput += btnValue; // Append the digit or decimal
    }
    formulaInput += btnValue; // Always append to the formula
    $displayDiv.innerText = currentInput;
  } else if (isOperatorBtn) {
    if (!endsWithOperator && !endsWithDecimal) {
      formulaInput += btnValue; // Append the operator to the formula if not ending with an operator or decimal
    } else if (endsWithDecimal) {
      formulaInput = formulaInput.slice(0, -1) + btnValue; // Remove trailing decimal before adding operator
    } else {
      // Handle consecutive operators, allowing '-' for negative numbers after an operator
      if (
        endsWithOperator &&
        btnValue === "-" &&
        !/[\+\-\*\/]{2}$/.test(formulaInput)
      ) {
        formulaInput += btnValue; // Allow '-' after an operator for negative numbers
      } else if (endsWithOperator) {
        // If the last character is an operator (excluding the negative number scenario), replace it with the current one
        formulaInput = formulaInput.replace(/[\+\-\*\/]+$/, btnValue);
      }
    }
    currentInput = btnValue;
    $displayDiv.innerText = currentInput;
    currentInput = ""; // Reset current input since we're moving on to a new number
  }

  // Update the display with the current input
};

$keyboardDiv.addEventListener("click", (event) => {
  if (event.target.id === "clear") {
    formulaInput = "";
    currentInput = "";
    $displayDiv.innerText = "0";
    $formulaScreenDiv.innerText = "";
    return;
  }

  if ($displayDiv.innerText.length >= 22) {
    $displayDiv.innerText = "DIGIT LIMIT MET";
    setTimeout(() => {
      $displayDiv.innerText = formulaInput;
    }, 1000);
    return;
  }

  if (event.target.id === "equals") {
    let resultFormula = "";
    resultFormula = evalFormula(formulaInput);
    $formulaScreenDiv.innerText = `${formulaInput}=${resultFormula}`;
    $displayDiv.innerText = resultFormula;
    formulaInput = `${resultFormula}`;
    currentInput = `${resultFormula}`;
    return;
  }

  if (event.target.tagName === "BUTTON") {
    getInput(event);
    $formulaScreenDiv.innerText = formulaInput;
  }
});
