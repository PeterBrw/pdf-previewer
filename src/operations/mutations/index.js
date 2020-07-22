import setPageNumber from "./setPageNumber/setPageNumber";
import setRotateArr from "./setRotateArr/setRotateArr";
import setZoom from "./setZoom/setZoom";
import { documentInfo } from "../../apollo/ApolloCache";

export const documentMutation = {
    setPageNumber: setPageNumber(documentInfo),
    setRotateArr: setRotateArr(documentInfo),
    setZoom: setZoom(documentInfo),
};
