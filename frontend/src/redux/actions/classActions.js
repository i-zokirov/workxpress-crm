import axios from "axios";
import baseUrl from "baseUrl";
import {
    CLASS_LIST_REQUEST,
    CLASS_LIST_SUCCESS,
    CLASS_LIST_FAILURE,
} from "redux/constants/classConstants";
import { deployNotification } from "./notificationActions";

export const loadClassList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: CLASS_LIST_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.get(`${baseUrl}/api/classes`, config);
            dispatch({ type: CLASS_LIST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: CLASS_LIST_FAILURE,
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
