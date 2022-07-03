import {
    RESET_NOTIFICATION,
    DISPATCH_NOTIFICATION,
} from "redux/constants/notificationConstants";

export const deployNotification = (
    message,
    type,
    autodismiss = true,
    milliseconds = 4000
) => {
    return (dispatch) => {
        dispatch({
            type: DISPATCH_NOTIFICATION,
            payload: { message, type, autodismiss },
        });
        if (autodismiss) {
            setTimeout(() => {
                dispatch({ type: RESET_NOTIFICATION });
            }, milliseconds);
        }
    };
};

export const dismissNotification = () => {
    return (dispatch) => {
        dispatch({ type: RESET_NOTIFICATION });
    };
};
