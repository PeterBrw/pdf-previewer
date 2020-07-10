import React from "react";
import Pdf from "./components/Pdf";
import "./App.css";

function App() {
    let id = Math.floor(Math.random() * 100) + 1;
    return (
        <div className="App">
            <Pdf id={id}></Pdf>
        </div>
    );
}

export default App;
