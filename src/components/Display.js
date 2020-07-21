import React from "react";

import { useQuery, gql } from "@apollo/client";
const Display = () => {
    const { data, loading } = useQuery(
        gql`
            query {
                initial @client
            }
        `
    );

    const dis = () => {
        console.log(data.initial[data.initial.length - 1].pageNumber);
    };

    return loading ? (
        <h1>loading</h1>
    ) : (
        <h1 onClick={dis}>
            {data.initial[data.initial.length - 1].pageNumber}
        </h1>
    );
};

export default Display;
