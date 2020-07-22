import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import "./Pdf.css";
import { createUseStyles } from "react-jss";
import VirtualList from "react-tiny-virtual-list";
import { documentMutation } from "../operations/mutations/index";
import { useQuery, gql } from "@apollo/client";

import pdfdoc from "../docs/Health2020-Long.pdf";
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

export default function Pdf() {
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
    // let [pageNumber, setPageNumber] = useState(1);
    const [array, setArray] = useState([]);
    // let [zoom, setZoom] = useState(1);
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
        // setPageNumber(data.documentInfo.pageNumber);
    };

    const handleChange = ({ target: { value } }) => {
        if (parseInt(value) > 0 && parseInt(value) <= numPages) {
            setScrollTo(value);
            // setPageNumber(value);
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.main}>
            <div className={classes.buttons}>
                <div>
                    <button onClick={() => console.log("zoom out")}>
                        Zoom Out
                    </button>
                    <button onClick={() => console.log("zoom out")}>
                        Zoom In
                    </button>
                    <button onClick={() => console.log("rotate left")}>
                        Rotate Left
                    </button>
                    <button onClick={() => console.log("rotate right")}>
                        Rotate Right
                    </button>
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
                                    rotate={rotateArr[pageNumber - 1] % 360}
                                />
                            </div>
                        )}
                    />
                </Document>
            </div>
        </div>
    );
}

