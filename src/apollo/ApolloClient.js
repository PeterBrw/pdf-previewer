import { ApolloClient } from "@apollo/client";
import cache from "./ApolloCache";

const client = new ApolloClient({
    cache: cache,
    connectToDevTools: true,
});

export default client;
