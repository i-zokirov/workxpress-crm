import {
    DISPATCH_NOTIFICATION,
    RESET_NOTIFICATION,
} from "redux/constants/notificationConstants";

export default (state = {}, action) => {
    switch (action.type) {
        case DISPATCH_NOTIFICATION:
            return {
                message: action.payload.message,
                type: action.payload.type,
                autodismiss: action.payload.autodismiss,
            };
        case RESET_NOTIFICATION:
            return {
                message: null,
                type: null,
            };
        default:
            return state;
    }
};
