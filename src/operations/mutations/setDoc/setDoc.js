const setDoc = (documentInfo) => {
    return (number) => {
        const documentInfoState = documentInfo();
        documentInfo({ ...documentInfoState, doc: number });
    };
};
export default setDoc;
