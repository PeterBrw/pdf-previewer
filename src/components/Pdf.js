import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "./Pdf.css";
import { createUseStyles } from "react-jss";
import VirtualList from "react-tiny-virtual-list";
import { documentMutation } from "../operations/mutations/index";
import { useQuery, gql } from "@apollo/client";
import Navbar from "./Navbar";

import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PAGE_HEIGHT = document.documentElement.clientHeight - 74;

const useStyles = createUseStyles({
    main: {
        backgroundColor: "#333",
    },
    pdfjs: {
        display: "inline-block",
        marginTop: 70,
        width: "100%",
    },
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
    "react-pdf__Page__canvas": {
        marginLeft: "auto",
        marginRight: "auto",
    },
});

export default function Pdf({ pdfdoc }) {
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
    const [numPages, setNumPages] = useState(null);
    const [array, setArray] = useState([]);
    let [scrollTo, setScrollTo] = useState(0);

    function onDocumentLoadSuccess({ numPages }) {
        setArray(Array.apply(null, Array(numPages)).map((x, i) => i));
        documentMutation.setRotateArr(
            Array.apply(null, Array(numPages)).map(() => 0)
        );
        setNumPages(numPages);
    }

    const onScroll = (scrollOffset) => {
        documentMutation.setPageNumber(
            (scrollOffset / PAGE_HEIGHT + 1).toFixed()
        );
    };

    const handleChange = ({ target: { value } }) => {
        if (parseInt(value) > 0 && parseInt(value) <= numPages) {
            setScrollTo(value);
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.main}>
            <Navbar
                handleChange={handleChange}
                pageNumber={pageNumber}
                numPages={numPages}
            />
            <div className={classes.pdfjs}>
                <Document file={pdfdoc} onLoadSuccess={onDocumentLoadSuccess}>
                    <VirtualList
                        width="100%"
                        height={PAGE_HEIGHT}
                        itemCount={array.length}
                        itemSize={PAGE_HEIGHT} // Also supports variable heights (array or function getter)
                        onScroll={onScroll}
                        scrollToIndex={scrollTo ? scrollTo - 1 : null}
                        scrollToAlignment={"center"}
                        renderItem={({ index, style }) => (
                            <div key={index} style={style}>
                                <Page
                                    pageNumber={index + 1}
                                    scale={zoom}
                                    rotate={rotateArr[index] % 360}
                                />
                            </div>
                        )}
                    />
                </Document>
            </div>
        </div>
    );
}
