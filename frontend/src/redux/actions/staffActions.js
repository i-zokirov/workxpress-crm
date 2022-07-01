import { 
    STAFF_LIST_FAILURE, 
    STAFF_LIST_REQUEST, 
    STAFF_LIST_SUCCESS 
} from "redux/constants/staffConstants";
import axios from "axios";
import baseUrl from "baseUrl"

export const loadStaffList = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({type: STAFF_LIST_REQUEST})
            const {auth : {userData}} = getState()
            const config = {
                headers:{
                    'Authorization': `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.get(`${baseUrl}/api/users`, config)
            dispatch({type: STAFF_LIST_SUCCESS, payload: data})
        } catch (error) {
             dispatch({
                type: STAFF_LIST_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}