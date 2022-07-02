import { combineReducers, createStore,  applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';
import initialState from "./initialState";

import { authenticationReducer, userProfileReducer } from "./reducers/userReducers";
import { studentsReducer } from "./reducers/studenReducers";
import { staffReducer } from "./reducers/staffReducers";
import { officesReducer } from "./reducers/officeReducers";


const middleware = [thunk]


const masterReducer = combineReducers({
    auth: authenticationReducer,
    students: studentsReducer,
    staff: staffReducer,
    offices: officesReducer,
    profile: userProfileReducer
})



const store = createStore(masterReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store