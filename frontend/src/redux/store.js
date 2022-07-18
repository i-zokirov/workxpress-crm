import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import initialState from "./initialState";

import {
    authenticationReducer,
    updatePasswordReducer,
    updateProfileReducer,
    userProfileReducer,
} from "./reducers/userReducers";
import {
    studentProfileCreateReducer,
    studentProfileDeleteReducer,
    studentProfileReducer,
    studentProfileUpdateReducer,
    studentsReducer,
} from "./reducers/studenReducers";
import { staffReducer, teachersReducer } from "./reducers/staffReducers";
import {
    officeCreateReducer,
    officeReducer,
    officesReducer,
    officeUpdateReducer,
} from "./reducers/officeReducers";
import notificationReducer from "./reducers/notificationReducer";
import { classListReducer } from "./reducers/classReducers";
import dashboardStatsReducer from "./reducers/dashboardStatsReducer";

const middleware = [thunk];

const masterReducer = combineReducers({
    auth: authenticationReducer,
    students: studentsReducer,
    studentProfile: studentProfileReducer,
    updateStudentProfile: studentProfileUpdateReducer,
    createStudentProfile: studentProfileCreateReducer,
    deleteStudentProfile: studentProfileDeleteReducer,
    staff: staffReducer,
    teacherStaff: teachersReducer,
    offices: officesReducer,
    office: officeReducer,
    updateOffice: officeUpdateReducer,
    createOffice: officeCreateReducer,
    profile: userProfileReducer,
    updateProfile: updateProfileReducer,
    updatePassword: updatePasswordReducer,
    notification: notificationReducer,
    classList: classListReducer,
    dashboardStats: dashboardStatsReducer,
});

const store = createStore(
    masterReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
