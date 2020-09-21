import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Accordion } from "./Accordion";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Accordion
          id="accordion-1"
          titre={<h2>Démonstration accordion</h2>}
          contenu={<p>Le contenu à afficher</p>}
        />
      </header>
    </div>
  );
}

export default App;
