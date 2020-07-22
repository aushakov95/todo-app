import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

let App = () => {
  const [text, setText] = useState("");

  useEffect(() => {
    let getDataFromAPI = async () => {
      let res = await fetch("http://localhost:9000/testAPI");
      let resText = await res.text();
      setText(resText);
    };
    getDataFromAPI();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{text}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
