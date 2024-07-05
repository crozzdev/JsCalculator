import "./Keyboard.css";
import { keyboardBtns } from "./constants.js";
import { Button } from "./Button.jsx";

export function Keyboard({ operatorClick, eqClick, clearClick, numClick }) {
  return (
    <div className="keyboard">
      {Object.entries(keyboardBtns).map(([key, { className, value }]) => {
        let onClick = "";
        if (key === "clear") {
          onClick = clearClick;
        } else if (key === "eq") {
          onClick = eqClick;
        } else if (className.includes("operations-btn")) {
          onClick = operatorClick;
        } else {
          onClick = numClick;
        }
        return (
          <Button
            key={key}
            id={key}
            className={className}
            value={value}
            onClick={onClick}
          >
            {value}
          </Button>
        );
      })}
    </div>
  );
}
