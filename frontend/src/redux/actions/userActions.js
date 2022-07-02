import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAILURE, 
    USER_LOGOUT,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAILURE
} from "redux/constants/userConstants";
import baseUrl from "baseUrl";
import axios from "axios"

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


export const fetchUserProfile = (userId) => {
    return async(dispatch, getState) => {
        try {
            dispatch({type: USER_PROFILE_REQUEST })
            const {auth : {userData}} = getState()
            const config = {
                headers:{
                    'Authorization': `Bearer ${userData.token}`
                }
            }
            const id = userId || userData._id
            const { data } = await axios.get(`${baseUrl}/api/users/${id}`, config)
            console.log(data)
            dispatch({type: USER_PROFILE_SUCCESS, payload: data})
        } catch (error) {
           dispatch({
                type: USER_PROFILE_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            }) 
        }
    }
}