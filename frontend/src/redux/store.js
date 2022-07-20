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
import {
    staffCreateReducer,
    staffReducer,
    teachersReducer,
    updateStaffReducer,
} from "./reducers/staffReducers";
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

const allReducers = combineReducers({
    state: (state = {}) => state,
    auth: authenticationReducer,
    students: studentsReducer,
    studentProfile: studentProfileReducer,
    updateStudentProfile: studentProfileUpdateReducer,
    createStudentProfile: studentProfileCreateReducer,
    deleteStudentProfile: studentProfileDeleteReducer,
    staff: staffReducer,
    createStaff: staffCreateReducer,
    updateStaff: updateStaffReducer,
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

const rootReducer = (state, action) => {
    if (action.type === "RESET_SESSION") {
        const { offices, classList, dashboardStats, students, staff, auth } =
            state;

        // reset entire state except the values excluded below
        state = { offices, classList, dashboardStats, students, staff, auth };
    }
    return allReducers(state, action);
};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
