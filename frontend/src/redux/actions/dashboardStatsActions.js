import axios from "axios";
import baseUrl from "baseUrl";
import {
    DASHBOARD_STATS_REQUEST,
    DASHBOARD_STATS_SUCCESS,
    DASHBOARD_STATS_FAILURE,
} from "redux/constants/dashboardStatsConstants";
import { deployNotification } from "./notificationActions";
import { logoutUser } from "./userActions";

export const loadDashboardStats = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: DASHBOARD_STATS_REQUEST });
            const {
                auth: { userData },
            } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${userData.token}`,
                },
            };
            const { data } = await axios.get(`${baseUrl}/api/stats`, config);
            dispatch({ type: DASHBOARD_STATS_SUCCESS, payload: data });
        } catch (error) {
            if (error.response.data.message === "jwt expired") {
                dispatch(logoutUser());
            }
            dispatch({
                type: DASHBOARD_STATS_FAILURE,
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
