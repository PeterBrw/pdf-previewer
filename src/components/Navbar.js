import React from "react";
import { createUseStyles } from "react-jss";
import { documentMutation } from "../operations/mutations/index";

const useStyles = createUseStyles({
    buttons: {
        position: "fixed",
        "z-index": 1,
        backgroundColor: "#333",
        width: "100%",
        height: "70px",
        "& div": {
            marginTop: "23px",
        },
    },
});

const Navbar = ({ handleChange, pageNumber, numPages }) => {
    const classes = useStyles();

    const pdfdoc = () => {
        documentMutation.setDoc(1);
    };

    const health = () => {
        documentMutation.setDoc(2);
    };

    const dummy = () => {
        documentMutation.setDoc(3);
    };

    return (
        <div className={classes.buttons}>
            <div>
                <button onClick={pdfdoc}>pdf doc</button>
                <button onClick={health}>health</button>
                <button onClick={dummy}>dummy</button>
                <input
                    type="number"
                    name="name"
                    onChange={handleChange}
                    placeholder={`Page ${pageNumber} of ${numPages}`}
                />
                <button disabled>
                    Page {pageNumber} of {numPages}
                </button>
            </div>
        </div>
    );
};

export default Navbar;
