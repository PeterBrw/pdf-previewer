import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    makeVar,
} from "@apollo/client";

const initialsValues = [
    {
        pageNumber: 1,
        allpages: 0,
    },
];

export const initialCache = makeVar(initialsValues);

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // Similar to AC2 local resolvers, this field policy
                // controls how the Query.darkModeEnabled field
                // gets read from the cache:
                initial() {
                    return initialCache();
                },
            },
        },
    },
});

const client = new ApolloClient({
    cache: cache,
    connectToDevTools: true,
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
