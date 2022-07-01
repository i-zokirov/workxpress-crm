import { 
    STUDENTS_LIST_REQUEST, 
    STUDENTS_LIST_SUCCESS, 
    STUDENTS_LIST_FAILURE 
} from "redux/constants/studentConstants";
import axios from "axios";
import baseUrl from "baseUrl";


export const loadStudentsList = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({type:  STUDENTS_LIST_REQUEST})
            const {auth : {userData}} = getState()

            const config = {
                headers:{
                    'Authorization': `Bearer ${userData.token}`
                }
            }

            const {data} = await axios.get(`${baseUrl}/api/students`, config)
            
            dispatch({type: STUDENTS_LIST_SUCCESS, payload: data})
            // dispatch({type: STUDENTS_LIST_FAILURE, payload: "data"})
        } catch(error){
            dispatch({
                type: STUDENTS_LIST_FAILURE,
                payload: error.response && error.response.data.message ? error.response.data.message  : error.message
            })
        }
    }
}