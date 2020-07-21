import React from "react";
import Pdf from "./components/Pdf";
import "./App.css";
import Toolbar from "./components/Toolbar";
import Display from "./components/Display";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    toolbar: {
        // bottom: "0px",
    },
});

function App() {
    let id = Math.floor(Math.random() * 100) + 1;

    const classes = useStyles();
    return (
        <div className="App">
            <Pdf id={id}></Pdf>
            <Toolbar className={classes.toolbar} />
        </div>
    );
}

export default App;
