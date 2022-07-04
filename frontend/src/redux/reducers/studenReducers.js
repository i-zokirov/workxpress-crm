import { STUDENT_PROFILE_DELETE_RESET } from "redux/constants/studentConstants";
import {
    STUDENTS_LIST_REQUEST,
    STUDENTS_LIST_SUCCESS,
    STUDENTS_LIST_FAILURE,
    STUDENT_PROFILE_REQUEST,
    STUDENT_PROFILE_SUCCESS,
    STUDENT_PROFILE_FAILURE,
    STUDENT_PROFILE_UPDATE_REQUEST,
    STUDENT_PROFILE_UPDATE_SUCCESS,
    STUDENT_PROFILE_UPDATE_FAILURE,
    STUDENT_PROFILE_DELETE_REQUEST,
    STUDENT_PROFILE_DELETE_SUCCESS,
    STUDENT_PROFILE_DELETE_FAILURE,
} from "redux/constants/studentConstants";
import initialState from "../initialState";

export const studentsReducer = (state = initialState.students, action) => {
    switch (action.type) {
        case STUDENTS_LIST_REQUEST:
            return {
                loading: true,
                list: [],
                error: null,
            };
        case STUDENTS_LIST_SUCCESS:
            return {
                loading: false,
                list: action.payload,
                error: null,
            };
        case STUDENTS_LIST_FAILURE:
            return {
                loading: false,
                list: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export const studentProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_PROFILE_REQUEST:
            return {
                loading: true,
                data: null,
                error: null,
            };
        case STUDENT_PROFILE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            };
        case STUDENT_PROFILE_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const studentProfileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_PROFILE_UPDATE_REQUEST:
            return {
                loading: true,
            };
        case STUDENT_PROFILE_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case STUDENT_PROFILE_UPDATE_FAILURE:
            return {
                loading: false,
                success: false,
            };
        default:
            return state;
    }
};

export const studentProfileDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case STUDENT_PROFILE_DELETE_REQUEST:
            return {
                loading: true,
            };
        case STUDENT_PROFILE_DELETE_SUCCESS:
            return {
                loading: false,
                success: true,
            };
        case STUDENT_PROFILE_DELETE_FAILURE:
            return {
                loading: false,
                success: false,
            };
        case STUDENT_PROFILE_DELETE_RESET:
            return {};
        default:
            return state;
    }
};
