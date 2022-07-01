import { USER_LOGOUT } from "redux/constants/userConstants";
import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAILURE 
} from "redux/constants/userConstants";
import initialState from "../initialState"


export const authenticationReducer = (state = initialState.auth, action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {
                loading: true,
                authenticated: false
            }
        case USER_LOGIN_SUCCESS:
            return {
                loading: false,
                authenticated: true,
                userData: action.payload
            }
        case USER_LOGIN_FAILURE:
            return {
                loading: false,
                authenticated: false,
                error: action.payload,
            }
        case USER_LOGOUT:
            return {
                loading: false,
                authenticated: false
            }
        default: 
            return state
    }
}