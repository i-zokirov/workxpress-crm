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
import { staffReducer, teachersReducer } from "./reducers/staffReducers";
import { officesReducer } from "./reducers/officeReducers";
import notificationReducer from "./reducers/notificationReducer";
import { classListReducer } from "./reducers/classReducers";

const middleware = [thunk];

const masterReducer = combineReducers({
    auth: authenticationReducer,
    students: studentsReducer,
    studentProfile: studentProfileReducer,
    updateStudentProfile: studentProfileUpdateReducer,
    deleteStudentProfile: studentProfileDeleteReducer,
    staff: staffReducer,
    teacherStaff: teachersReducer,
    offices: officesReducer,
    profile: userProfileReducer,
    updateProfile: updateProfileReducer,
    notification: notificationReducer,
    classList: classListReducer,
});

const store = createStore(
    masterReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
