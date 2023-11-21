import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)
  const [searchbarValue, setsearchbarValue] = useState("");

  return (
    <div className="App">
      <input type="text" name="Searchbar" value={searchbarValue} />
    </div>
  );
}

export default App;
