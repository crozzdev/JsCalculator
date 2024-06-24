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

let formulaString = "";

const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

$keyboardDiv.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const btnValue = event.target.value;
    const isNumberBtn = event.target.className.includes("num-btn");
    const isDecimalBtn = btnValue === ".";
    const endsWithOperator = /[\+\-\*\/]$/.test(formulaString);
    const lastNumberHasDecimal = /(\.\d*)$/.test(formulaString);
    const startsWithZero = /^(0$|.*[\+\-\*\/]0$)/.test(formulaString);

    if ($displayDiv.innerText.length >= 22) {
      $displayDiv.innerText = "DIGIT LIMIT MET";
      setTimeout(() => {
        $displayDiv.innerText = formulaString;
      }, 1000);
      return;
    }

    if (isNumberBtn && !isDecimalBtn) {
      if (btnValue === "0" && startsWithZero) {
        // Prevent adding more zeros if it starts with a zero
        return;
      } else if (formulaString === "0" || /[\+\-\*\/]0$/.test(formulaString)) {
        // Replace the last '0' with the clicked number if it's a standalone zero or follows an operator
        formulaString = formulaString.slice(0, -1) + btnValue;
      } else {
        formulaString += btnValue;
      }
      $displayDiv.innerText = formulaString;
    } else if (isDecimalBtn && !lastNumberHasDecimal && !endsWithOperator) {
      if (formulaString === "" || startsWithZero) {
        // Append '0.' if formulaString is empty or ends with a standalone '0'
        formulaString += "0.";
      } else {
        formulaString += ".";
      }
      $displayDiv.innerText = formulaString;
    }
  }

  if (event.target.id === "clear") {
    formulaString = "";
    $displayDiv.innerText = "0";
  }
});
