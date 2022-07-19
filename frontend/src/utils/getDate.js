const getDate = (stringDate, format = "dd:mm:yyy") => {
    const date = new Date(stringDate);
    const day = date.getDate();
    const month =
        date.getMonth() + 1 < 10
            ? `0${date.getMonth() + 1}`
            : date.getMonth() + 1;
    const year = date.getFullYear();

    switch (format) {
        case "dd:mm:yyy":
            return `${day}/${month}/${year}`;
        case "yyyy:mm:dd":
            return `${year}/${month}/${day}`;
        case "mm:dd:yyyy":
            return `${month}/${day}/${year}`;
        case "yyyy-mm-dd":
            return `${year}-${month}-${day}`;
    }
};

export default getDate;
