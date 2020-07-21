import React from "react";
import "./Toolbar.css";
import { createUseStyles } from "react-jss";

import { initialCache } from "../index";
import { useQuery, gql } from "@apollo/client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faUndo } from "@fortawesome/free-solid-svg-icons";

const useStyles = createUseStyles({
    tool: {
        position: "fixed",
        bottom: "23px",
        padding: "28px",
        backgroundColor: "#333",
        left: "calc(-50vw + 50%)",
        right: "calc(-50vw + 50%)",
        marginLeft: "auto",
        marginRight: "auto",
        width: "350px",
    },
    divTool: {
        display: "flex",
        justifyContent: "space-between",
        color: "rgba(255,255,255,0.64)",
    },
    flip: {
        transform: "scaleX(-1)" /* standard */,
        filter: "FlipH",
    },
});

const Toolbar = () => {
    const { data, loading } = useQuery(
        gql`
            query {
                initial @client
            }
        `
    );

    const toConsole = () => {
        console.log(data.initial);
    };

    const classes = useStyles();

    return loading ? (
        <h1>loading</h1>
    ) : (
        <div className={classes.tool}>
            <div className={classes.divTool}>
                <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>

                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faUndo}></FontAwesomeIcon>

                <FontAwesomeIcon
                    icon={faUndo}
                    className={classes.flip}
                ></FontAwesomeIcon>
            </div>
        </div>
    );
};

export default Toolbar;

// initialCache(
//     initialCache().concat({
//         pageNumber: Math.floor(
//             Math.random() * (100 - 1) + 1
//         ),
//         allpages: 1,
//     })
// );
