import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAILURE,
} from "redux/constants/userConstants";
import initialState from "../initialState";

export const authenticationReducer = (state = initialState.auth, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
                authenticated: false,
            };
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                authenticated: true,
                userData: action.payload,
            };
        case USER_LOGIN_FAILURE:
            return {
                loading: false,
                authenticated: false,
                error: action.payload,
            };
        case USER_LOGOUT:
            return {
                loading: false,
                authenticated: false,
            };
        default:
            return state;
    }
};

export const userProfileReducer = (state = initialState.profile, action) => {
    switch (action.type) {
        case USER_PROFILE_REQUEST:
            return {
                loading: true,
                data: null,
            };
        case USER_PROFILE_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case USER_PROFILE_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return {
                loading: true,
                success: false,
                error: null,
            };
        case USER_PROFILE_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                error: null,
            };
        case USER_PROFILE_UPDATE_FAILURE:
            return {
                loading: false,
                success: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
