import {
    DASHBOARD_STATS_REQUEST,
    DASHBOARD_STATS_SUCCESS,
    DASHBOARD_STATS_FAILURE,
} from "redux/constants/dashboardStatsConstants";

export default (state = {}, action) => {
    switch (action.type) {
        case DASHBOARD_STATS_REQUEST:
            return {
                loading: true,
                data: null,
                error: null,
            };
        case DASHBOARD_STATS_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                error: null,
            };
        case DASHBOARD_STATS_FAILURE:
            return {
                loading: false,
                data: null,
                error: action.payload,
            };
        default:
            return state;
    }
};
