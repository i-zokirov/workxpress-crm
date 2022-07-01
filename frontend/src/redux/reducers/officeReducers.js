import { 
    OFFICE_LIST_REQUEST, 
    OFFICE_LIST_SUCCESS, 
    OFFICE_LIST_FAILURE 
} from "redux/constants/officeConstants";
import initialState from "redux/initialState";

export const officesReducer = (state = initialState.offices, action) => {
    switch(action.type){
        case OFFICE_LIST_REQUEST:
            return {
                loading: true,
                list: [],
                error: null,
            }
        case OFFICE_LIST_SUCCESS:
            return {
                loading: false,
                list: action.payload,
                error: null,
            }
        case OFFICE_LIST_FAILURE:
            return {
                loading: false,
                list: [],
                error: action.payload,
            }
        default:
            return state
    }
}