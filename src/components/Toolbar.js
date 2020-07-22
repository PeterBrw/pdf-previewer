import React, { useEffect } from "react";
import "./Toolbar.css";
import { createUseStyles } from "react-jss";

import { documentMutation } from "../operations/mutations/index";

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
    let {
        data: {
            documentInfo: { pageNumber, rotateArr, zoom },
        },
        loading,
    } = useQuery(
        gql`
            query {
                documentInfo @client {
                    pageNumber
                    rotateArr
                    zoom
                }
            }
        `
    );

    const rotateRight = () => {
        documentMutation.setRotateArr(
            rotateArr.map((element, index) => {
                if (index === pageNumber - 1) {
                    return element + 90;
                }
                return element;
            })
        );
        console.log(rotateArr);
    };

    const rotateLeft = () => {
        documentMutation.setRotateArr(
            rotateArr.map((element, index) => {
                if (index === pageNumber - 1) {
                    return element + 270;
                }
                return element;
            })
        );
        console.log(rotateArr);
    };

    const zoomOut = () => {
        console.log(zoom);
        documentMutation.setZoom((zoom -= 0.1));
        console.log(zoom);
    };
    const zoomIn = () => {
        documentMutation.setZoom((zoom += 0.1));
    };

    useEffect(() => console.log(pageNumber));

    const classes = useStyles();

    return loading ? (
        <h1>loading</h1>
    ) : (
        <div className={classes.tool}>
            <div className={classes.divTool}>
                <FontAwesomeIcon
                    icon={faMinus}
                    onClick={zoomOut}
                ></FontAwesomeIcon>

                <FontAwesomeIcon
                    icon={faPlus}
                    onClick={zoomIn}
                ></FontAwesomeIcon>
                <FontAwesomeIcon
                    icon={faUndo}
                    onClick={rotateLeft}
                ></FontAwesomeIcon>

                <FontAwesomeIcon
                    icon={faUndo}
                    className={classes.flip}
                    onClick={rotateRight}
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
