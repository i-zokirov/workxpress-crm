import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAILURE 
} from "redux/constants/userConstants";
import baseUrl from "baseUrl";
import axios from "axios"
import { USER_LOGOUT } from "redux/constants/userConstants";

export const authenticateUser = (email, password) => {
    return async (dispatch) => {
        try {
            dispatch({type: USER_LOGIN_REQUEST})
            const { data } = await axios.post(`${baseUrl}/api/users/sign-in`, {email, password})
            localStorage.setItem("userData", JSON.stringify(data))
            setTimeout(() => {
                dispatch({type: USER_LOGIN_SUCCESS, payload: data})
            }, 3000)

        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}


export const logoutUser = () => {
    return (dispatch) => {
        localStorage.removeItem("userData")
        dispatch({type: USER_LOGOUT})
    }
}