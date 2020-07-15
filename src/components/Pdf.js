import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import "./Pdf.css";
import VirtualList from "react-tiny-virtual-list";
// import { Document, Page } from "react-pdf/dist/entry.webpack";
import pdfdoc from "../docs/PPTXtest.pptx.pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const PAGE_HEIGHT = document.documentElement.clientHeight;

export default function Pdf() {
    const [numPages, setNumPages] = useState(null);
    let [pageNumber, setPageNumber] = useState(1);
    const [array, setArray] = useState([]);
    let [zoom, setZoom] = useState(1);
    let [rotateArr, setRotateArr] = useState([]);
    
    function onDocumentLoadSuccess({ numPages }) {
        setArray(Array.apply(null, Array(numPages)).map((x, i) => i));
        setRotateArr(Array.apply(null, Array(numPages)).map(() => 0));
        setNumPages(numPages);
    }

    const zoomOut = () => {
        setZoom((zoom -= 0.1));
    };
    const zoomIn = () => {
        setZoom((zoom += 0.1));
    };

    const rotateRight = () => {
        setRotateArr(
            rotateArr.map((element, index) => {
                if (index === pageNumber - 1) {
                    console.log("hey");
                    return element + 90;
                }
                return element;
            })
        );
        console.log(rotateArr);
    };

    const rotateLeft = () => {
        setRotateArr(
            rotateArr.map((element, index) => {
                if (index === pageNumber - 1) {
                    console.log("not working");
                    return element + 270;
                }
                return element;
            })
        );
        console.log(rotateArr);
    };

    const scroll = (e) => {
        setPageNumber((e / 700 + 1).toFixed());
    };

    const handleChange = (e) => {
        setPageNumber(e.target.value);
        // console.log("e: ", e.target.value);
        // if (e.target.value === "") {
        //     console.log("pageNumber: ", pageNumber);
        //     document
        //         .querySelector(`div[data-page-number='${pageNumber}']`)
        //         .scrollIntoView();
        // }
        // document
        //     .querySelector(`div[data-page-number='${e.target.value}']`)
        //     .scrollIntoView();
        // console.log(e.target.value);
        // if (e.target.value >= 1 && e.target.value <= numPages) {
        //     setPageNumber(parseInt(e.target.value));
        //     console.log("pag num", pageNumber);
        //     console.log(pageNumber, e.target.value);
        //     document
        //         .querySelector(`div[data-page-number='${e.target.value}']`)
        //         .scrollIntoView();
        // }
    };

    return (
        <div>
            <div className="buttons">
                <div>
                    <button onClick={zoomOut}>Zoom Out</button>
                    <button onClick={zoomIn}>Zoom In</button>
                    <button onClick={rotateLeft}>Rotate Left</button>
                    <button onClick={rotateRight}>Rotate Right</button>
                    <input
                        type="number"
                        name="name"
                        onChange={handleChange}
                        placeholder="Enter Page"
                    />
                </div>
            </div>
            <div className="pdfjs">
                <Document file={pdfdoc} onLoadSuccess={onDocumentLoadSuccess}>
                    <VirtualList
                        width="100%"
                        height={700}
                        itemCount={array.length}
                        itemSize={700} // Also supports variable heights (array or function getter)
                        scrollToIndex={pageNumber}
                        onScroll={scroll}
                        renderItem={({ index, style }) => (
                            <div key={index} style={style}>
                                <Page
                                    // id={id++}
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

// <p>
// Page {pageNumber} of {numPages}
// </p>
