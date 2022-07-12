import {
    STAFF_LIST_FAILURE,
    STAFF_LIST_REQUEST,
    STAFF_LIST_SUCCESS,
    TEACHERS_LIST_FAILURE,
    TEACHERS_LIST_REQUEST,
    TEACHERS_LIST_SUCCESS,
} from "redux/constants/staffConstants";
import axios from "axios";
import baseUrl from "baseUrl";
import { deployNotification } from "./notificationActions";
import { logoutUser } from "./userActions";
export const loadStaffList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: STAFF_LIST_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.get(`${baseUrl}/api/users`, config);
            dispatch({ type: STAFF_LIST_SUCCESS, payload: data });
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            dispatch({
                type: STAFF_LIST_FAILURE,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
            dispatch(
                deployNotification(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
                    "error",
                    false
                )
            );
        }
    };
};

export const loadTeacherStaffList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: TEACHERS_LIST_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.get(
                `${baseUrl}/api/users?role=Teacher`,
                config
            );
            dispatch({ type: TEACHERS_LIST_SUCCESS, payload: data });
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            dispatch({
                type: TEACHERS_LIST_FAILURE,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
            dispatch(
                deployNotification(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
                    "error",
                    false
                )
            );
        }
    };
};
