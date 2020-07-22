const setRotateArr = (documentInfo) => {
    return (rotateArr) => {
        const documentInfoState = documentInfo();
        documentInfo({
            ...documentInfoState,
            rotateArr: rotateArr,
        });
    };
};

export default setRotateArr;
