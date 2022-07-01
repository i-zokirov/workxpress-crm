import { 
    STAFF_LIST_FAILURE, 
    STAFF_LIST_REQUEST, 
    STAFF_LIST_SUCCESS 
} from "redux/constants/staffConstants";
import initialState from "redux/initialState";

export const staffReducer = (state = initialState.staff, action) => {
    switch(action.type){
        case STAFF_LIST_REQUEST:
            return {
                loading: true,
                list: [],
                error: null,
            }
        case STAFF_LIST_SUCCESS:
            return {
                loading: false,
                list: action.payload,
                error: null,
            }
        case STAFF_LIST_FAILURE:
            return {
                loading: false,
                list: [],
                error: action.payload,
            }
        default:
            return state
    }
}