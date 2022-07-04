import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import initialState from "./initialState";

import {
    authenticationReducer,
    updateProfileReducer,
    userProfileReducer,
} from "./reducers/userReducers";
import {
    studentProfileDeleteReducer,
    studentProfileReducer,
    studentProfileUpdateReducer,
    studentsReducer,
} from "./reducers/studenReducers";
import { staffReducer } from "./reducers/staffReducers";
import { officesReducer } from "./reducers/officeReducers";
import notificationReducer from "./reducers/notificationReducer";

const middleware = [thunk];

const masterReducer = combineReducers({
    auth: authenticationReducer,
    students: studentsReducer,
    studentProfile: studentProfileReducer,
    updateStudentProfile: studentProfileUpdateReducer,
    deleteStudentProfile: studentProfileDeleteReducer,
    staff: staffReducer,
    offices: officesReducer,
    profile: userProfileReducer,
    updateProfile: updateProfileReducer,
    notification: notificationReducer,
});

const store = createStore(
    masterReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
