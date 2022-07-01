import { 
    STUDENTS_LIST_REQUEST, 
    STUDENTS_LIST_SUCCESS, 
    STUDENTS_LIST_FAILURE 
} from "redux/constants/studentConstants";
import initialState from "../initialState"



export const studentsReducer = (state = initialState.students, action) => {
    switch(action.type){
        case STUDENTS_LIST_REQUEST:
            return {
                loading: true,
                list: [],
                error: null
            }
        case STUDENTS_LIST_SUCCESS:
            return {
                loading: false,
                list: action.payload,
                error: null
            }
        case STUDENTS_LIST_FAILURE:
            return {
                loading: false,
                list: [],
                error: action.payload
            }
        default:
            return state
    }
}