import "./App.css";
import { Screen } from "./components/Screen";
import { Keyboard } from "./components/Keyboard";

function App() {
  return (
    <div className="app">
      <Screen className="formulaScreen" valueToDisplay={""} />
      <Screen className="outputScreen" valueToDisplay={0} />
      <Keyboard className="keyboard" />
    </div>
  );
}

export default App;
