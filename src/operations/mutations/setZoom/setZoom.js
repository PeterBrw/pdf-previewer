const setZoom = (documentInfo) => {
    return (zoom) => {
        const documentInfoState = documentInfo();
        documentInfo({
            ...documentInfoState,
            zoom: zoom,
        });
    };
};
export default setZoom;
