import React from "react";
import Pdf from "./components/Pdf";
import "./App.css";
import Toolbar from "./components/Toolbar";

import { useQuery, gql } from "@apollo/client";

import pdfdoc from "./docs/PPTXtest.pptx.pdf";
import health from "./docs/Health2020-Long.pdf";
import dummy from "./docs/dummy.pdf";

function App() {
    let {
        data: {
            documentInfo: { doc },
        },
        loading,
    } = useQuery(
        gql`
            query {
                documentInfo @client {
                    doc
                }
            }
        `
    );



    return (
        <div className="App">
            <Pdf pdfdoc={document(doc)}></Pdf>
            <Toolbar />
        </div>
    );
}

const document = (input) => {
    if (input === 1) return pdfdoc;
    if (input === 2) return health;
    if (input === 3) return dummy;
};

export default App;
