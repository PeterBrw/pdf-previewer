const setPageNumber = (documentInfo) => {
    return (pageNumber) => {
        const documentInfoState = documentInfo();
        documentInfo({ ...documentInfoState, pageNumber: pageNumber });
    };
};
export default setPageNumber;
