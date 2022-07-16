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
    STUDENT_PROFILE_CREATE_REQUEST,
    STUDENT_PROFILE_CREATE_SUCCESS,
    STUDENT_PROFILE_CREATE_FAILURE,
    STUDENT_PROFILE_DELETE_REQUEST,
    STUDENT_PROFILE_DELETE_SUCCESS,
    STUDENT_PROFILE_DELETE_FAILURE,
} from "redux/constants/studentConstants";
import axios from "axios";
import baseUrl from "baseUrl";
import { deployNotification } from "./notificationActions";
import { STUDENT_PROFILE_DELETE_RESET } from "redux/constants/studentConstants";
import { logoutUser } from "./userActions";

export const loadStudentsList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: STUDENTS_LIST_REQUEST });
            const {
                auth: { userData },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };

            const { data } = await axios.get(`${baseUrl}/api/students`, config);

            dispatch({ type: STUDENTS_LIST_SUCCESS, payload: data });
            // dispatch({type: STUDENTS_LIST_FAILURE, payload: "data"})
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            dispatch({
                type: STUDENTS_LIST_FAILURE,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
};

export const fetchStudentProfile = (studentId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: STUDENT_PROFILE_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.get(
                `${baseUrl}/api/students/${studentId}`,
                config
            );
            dispatch({ type: STUDENT_PROFILE_SUCCESS, payload: data });
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            dispatch({
                type: STUDENT_PROFILE_FAILURE,
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
                    "error"
                )
            );
        }
    };
};

export const createStudentProfile = (reqBody) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: STUDENT_PROFILE_CREATE_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.post(
                `${baseUrl}/api/students/new`,
                reqBody,
                config
            );
            dispatch({ type: STUDENT_PROFILE_CREATE_SUCCESS, payload: data });
            dispatch(deployNotification("Successfully created!", "success"));
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            dispatch({ type: STUDENT_PROFILE_CREATE_FAILURE });
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

export const updateStudentProfile = (reqBody, studentId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: STUDENT_PROFILE_UPDATE_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            await axios.put(
                `${baseUrl}/api/students/${studentId}`,
                reqBody,
                config
            );
            dispatch({ type: STUDENT_PROFILE_UPDATE_SUCCESS });
            dispatch(deployNotification("Successfully updated!", "success"));
            dispatch(fetchStudentProfile(studentId));
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            dispatch({ type: STUDENT_PROFILE_UPDATE_FAILURE });
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

export const deleteStudentProfile = (studentId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: STUDENT_PROFILE_DELETE_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            await axios.delete(`${baseUrl}/api/students/${studentId}`, config);

            dispatch({ type: STUDENT_PROFILE_DELETE_SUCCESS });
            dispatch(deployNotification("Successfully deleted!", "success"));
            dispatch(loadStudentsList());
            setTimeout(() => {
                dispatch({ type: STUDENT_PROFILE_DELETE_RESET });
            }, 1);
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            dispatch({ type: STUDENT_PROFILE_DELETE_FAILURE });
            dispatch(
                deployNotification(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
                    "error"
                )
            );
        }
    };
};
