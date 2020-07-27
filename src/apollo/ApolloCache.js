import { InMemoryCache, makeVar } from "@apollo/client";

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                // Similar to AC2 local resolvers, this field policy
                // controls how the Query.darkModeEnabled field
                // gets read from the cache:
                documentInfo: {
                    read() {
                        return documentInfo();
                    },
                },
            },
        },
    },
});

export default cache;

const documentInfoInitialValues = {
    pageNumber: 1,
    rotateArr: [],
    zoom: 1,
    doc: 1,
};

export const documentInfo = makeVar(documentInfoInitialValues);
