import {
    OFFICE_LIST_REQUEST,
    OFFICE_LIST_SUCCESS,
    OFFICE_LIST_FAILURE,
    OFFICE_REQUEST,
    OFFICE_SUCCESS,
    OFFICE_FAILURE,
} from "redux/constants/officeConstants";
import initialState from "redux/initialState";

export const officesReducer = (state = initialState.offices, action) => {
    switch (action.type) {
        case OFFICE_LIST_REQUEST:
            return {
                loading: true,
                list: [],
                error: null,
            };
        case OFFICE_LIST_SUCCESS:
            return {
                loading: false,
                list: action.payload,
                error: null,
            };
        case OFFICE_LIST_FAILURE:
            return {
                loading: false,
                list: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export const officeReducer = (state = {}, action) => {
    switch (action.type) {
        case OFFICE_REQUEST:
            return {
                loading: true,
                data: null,
                error: null,
            };
        case OFFICE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            };
        case OFFICE_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
