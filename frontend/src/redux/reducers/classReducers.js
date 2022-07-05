import {
    CLASS_LIST_REQUEST,
    CLASS_LIST_SUCCESS,
    CLASS_LIST_FAILURE,
} from "redux/constants/classConstants";
import initialState from "redux/initialState";

export const classListReducer = (state = initialState.classList, action) => {
    switch (action.type) {
        case CLASS_LIST_REQUEST:
            return {
                loading: false,
                data: [],
            };
        case CLASS_LIST_SUCCESS:
            return {
                loading: false,
                data: action.payload,
            };
        case CLASS_LIST_FAILURE:
            return {
                loading: false,
                data: [],
                error: action.payload,
            };
        default:
            return state;
    }
};
