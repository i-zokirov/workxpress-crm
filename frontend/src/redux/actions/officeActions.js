import axios from "axios";
import baseUrl from "baseUrl";
import {
    OFFICE_LIST_REQUEST,
    OFFICE_LIST_SUCCESS,
    OFFICE_LIST_FAILURE,
    OFFICE_REQUEST,
    OFFICE_SUCCESS,
    OFFICE_FAILURE,
    OFFICE_UPDATE_REQUEST,
    OFFICE_UPDATE_SUCCESS,
    OFFICE_UPDATE_FAILURE,
    OFFICE_CREATE_REQUEST,
    OFFICE_CREATE_SUCCESS,
    OFFICE_CREATE_FAILURE,
} from "redux/constants/officeConstants";
import { deployNotification } from "./notificationActions";
import { logoutUser } from "./userActions";

export const loadOfficeList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: OFFICE_LIST_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.get(`${baseUrl}/api/offices`, config);
            dispatch({ type: OFFICE_LIST_SUCCESS, payload: data });
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            const err =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: OFFICE_LIST_FAILURE,
                payload: err,
            });
            dispatch(deployNotification(err, "error"));
        }
    };
};

export const loadOffice = (officeId) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: OFFICE_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.get(
                `${baseUrl}/api/offices/${officeId}`,
                config
            );
            dispatch({ type: OFFICE_SUCCESS, payload: data });
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            const err =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: OFFICE_FAILURE,
                payload: err,
            });

            dispatch(deployNotification(err, "error"));
        }
    };
};

export const updateOffice = (officeId, reqbody) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: OFFICE_UPDATE_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.put(
                `${baseUrl}/api/offices/${officeId}`,
                reqbody,
                config
            );
            dispatch({ type: OFFICE_UPDATE_SUCCESS });
            dispatch(loadOffice(officeId));
            dispatch(deployNotification(data.message, "success"));
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            const err =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            dispatch({
                type: OFFICE_UPDATE_FAILURE,
                payload: err,
            });

            dispatch(deployNotification(err, "error"));
        }
    };
};

export const createOffice = (reqbody) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: OFFICE_CREATE_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.post(
                `${baseUrl}/api/offices`,
                reqbody,
                config
            );
            dispatch({ type: OFFICE_CREATE_SUCCESS, payload: data });
            dispatch(
                deployNotification(
                    "New office has been successfully created",
                    "success"
                )
            );
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            const err =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            console.log(err);
            dispatch({
                type: OFFICE_CREATE_FAILURE,
                payload: err,
            });

            dispatch(deployNotification(err, "error"));
        }
    };
};
