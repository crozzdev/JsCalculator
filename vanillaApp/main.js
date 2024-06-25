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
let formulaOutput = "";

const infixToFunction = {};

const getInput = (event) => {
  const btnValue = event.target.value;
  const isNumberBtn = event.target.className.includes("num-btn");
  const isDecimalBtn = btnValue === ".";
  const endsWithOperator = /[\+\-\*\/]$/.test(formulaInput);
  const lastNumberHasDecimal = /(\.\d*)$/.test(formulaInput);
  const startsWithZero = /^(0$|.*[\+\-\*\/]0$)/.test(formulaInput);

  if (isNumberBtn && !isDecimalBtn) {
    if (btnValue === "0" && startsWithZero) {
      // Prevent adding more zeros if it starts with a zero
      return;
    } else if (formulaInput === "0" || /[\+\-\*\/]0$/.test(formulaInput)) {
      // Replace the last '0' with the clicked number if it's a standalone zero or follows an operator
      formulaInput = formulaInput.slice(0, -1) + btnValue;
    } else {
      formulaInput += btnValue;
    }
  } else if (isDecimalBtn && !lastNumberHasDecimal && !endsWithOperator) {
    if (formulaInput === "" || startsWithZero) {
      // Append '0.' if formulaInput is empty or ends with a standalone '0'
      formulaInput += "0.";
    } else {
      formulaInput += ".";
    }
  }
};

$keyboardDiv.addEventListener("click", (event) => {
  if (event.target.id === "clear") {
    formulaInput = "";
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

  if (event.target.tagName === "BUTTON") {
    getInput(event);
    $displayDiv.innerText = formulaInput;
    $formulaScreenDiv.innerText = formulaInput;
  }
});
