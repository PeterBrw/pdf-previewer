import React from "react";
import Pdf from "./components/Pdf";
import "./App.css";
import Toolbar from "./components/Toolbar";

function App() {
    let id = Math.floor(Math.random() * 100) + 1;

    return (
        <div className="App">
            <Pdf id={id}></Pdf>
            <Toolbar />
        </div>
    );
}

export default App;
