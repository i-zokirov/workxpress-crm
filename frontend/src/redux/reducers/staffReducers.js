import {
    STAFF_LIST_FAILURE,
    STAFF_LIST_REQUEST,
    STAFF_LIST_SUCCESS,
    STAFF_CREATE_FAILURE,
    STAFF_CREATE_REQUEST,
    STAFF_CREATE_SUCCESS,
    STAFF_UPDATE_FAILURE,
    STAFF_UPDATE_REQUEST,
    STAFF_UPDATE_SUCCESS,
    TEACHERS_LIST_FAILURE,
    TEACHERS_LIST_REQUEST,
    TEACHERS_LIST_SUCCESS,
} from "redux/constants/staffConstants";
import initialState from "redux/initialState";

export const staffReducer = (state = initialState.staff, action) => {
    switch (action.type) {
        case STAFF_LIST_REQUEST:
            return {
                loading: true,
                list: [],
                error: null,
            };
        case STAFF_LIST_SUCCESS:
            return {
                loading: false,
                list: action.payload,
                error: null,
            };
        case STAFF_LIST_FAILURE:
            return {
                loading: false,
                list: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export const teachersReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHERS_LIST_REQUEST:
            return {
                loading: true,
                list: [],
                error: null,
            };
        case TEACHERS_LIST_SUCCESS:
            return {
                loading: false,
                list: action.payload,
                error: null,
            };
        case TEACHERS_LIST_FAILURE:
            return {
                loading: false,
                list: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export const updateStaffReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_UPDATE_REQUEST:
            return {
                loading: true,
            };
        case STAFF_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case STAFF_UPDATE_FAILURE:
            return {
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const staffCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case STAFF_CREATE_REQUEST:
            return {
                loading: true,
            };
        case STAFF_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                data: action.payload,
            };
        case STAFF_CREATE_FAILURE:
            return {
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
