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
    USER_PASSWORD_UPDATE_REQUEST,
    USER_PASSWORD_UPDATE_SUCCESS,
    USER_PASSWORD_UPDATE_FAILURE,
} from "redux/constants/userConstants";
import baseUrl from "baseUrl";
import axios from "axios";
import { deployNotification } from "./notificationActions";

export const authenticateUser = (reqbody) => {
    return async (dispatch) => {
        try {
            dispatch({ type: USER_LOGIN_REQUEST });
            const { data } = await axios.post(
                `${baseUrl}/api/users/sign-in`,
                reqbody
            );

            localStorage.setItem("userData", JSON.stringify(data));
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
        } catch (error) {
            const err =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            let errObj = {};
            if (err === "Password expired") {
                errObj = {
                    message: err,
                    type: "warning",
                };
            } else {
                errObj = {
                    message: err,
                    type: "error",
                };
            }
            dispatch({
                type: USER_LOGIN_FAILURE,
                payload: errObj,
            });
        }
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem("userData");
        dispatch({ type: USER_LOGOUT });
        dispatch({ type: "RESET_SESSION" });
    };
};

export const fetchUserProfile = (userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: USER_PROFILE_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const id = userId || userData._id;
            const { data } = await axios.get(
                `${baseUrl}/api/users/${id}`,
                config
            );
            dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: USER_PROFILE_FAILURE,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const updateUserProfile = (reqBody, userId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const id = userId || userData._id;
            const { data } = await axios.put(
                `${baseUrl}/api/users/${id}`,
                reqBody,
                config
            );
            dispatch(fetchUserProfile(id));
            dispatch({ type: USER_PROFILE_UPDATE_SUCCESS });
        } catch (error) {
            dispatch({
                type: USER_PROFILE_UPDATE_FAILURE,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const updateUserPassword = (reqBody) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: USER_PASSWORD_UPDATE_REQUEST });

            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };

            const { data } = await axios.put(
                `${baseUrl}/api/users/${userData._id}/password`,
                reqBody,
                config
            );

            dispatch({ type: USER_PASSWORD_UPDATE_SUCCESS });
            dispatch(deployNotification(data.message, "success"));
        } catch (error) {
            const err =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: USER_PASSWORD_UPDATE_FAILURE,
                payload: err,
            });
            dispatch(deployNotification(err, "error"));
        }
    };
};
