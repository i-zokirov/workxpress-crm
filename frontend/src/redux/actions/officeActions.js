import axios from "axios";
import baseUrl from "baseUrl"
import { 
    OFFICE_LIST_REQUEST, 
    OFFICE_LIST_SUCCESS, 
    OFFICE_LIST_FAILURE 
} from "redux/constants/officeConstants";


export const loadOfficeList = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({type: OFFICE_LIST_REQUEST})
            const {auth : {userData}} = getState()
            const config = {
                headers:{
                    'Authorization': `Bearer ${userData.token}`
                }
            }
            const {data} = await axios.get(`${baseUrl}/api/offices`, config)
            dispatch({type: OFFICE_LIST_SUCCESS, payload: data})
        } catch (error) {
             dispatch({
                type: OFFICE_LIST_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}