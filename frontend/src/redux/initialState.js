// userData from localStorage
const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : {};

const initialState = {
    auth: {
        userData,
        authenticated: userData.token ? true : false,
    },
    students: {
        list: [],
    },
    staff: {
        list: [],
    },
    offices: {
        list: [],
    },
    classList: {
        data: [],
    },
    profile: {
        data: null,
    },
};

export default initialState;
