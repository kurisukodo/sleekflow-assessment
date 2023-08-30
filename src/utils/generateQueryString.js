const generateQueryString = (obj) => {
    return '?' + new URLSearchParams(obj);
};

export default generateQueryString;
