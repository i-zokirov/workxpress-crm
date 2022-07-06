import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import ProfileInfoCard from "./ProfileInfoCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MDBox from "components/MDBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "redux/actions/studentActions";
import { useParams } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import { LinearProgress, Box, Grid, Divider } from "@mui/material";
import getDateAndTime from "utils/getDateAndTime";
import ProfileEdit from "./ProfileEdit";
import ProfileNotes from "./ProfileNotes";
import { loadClassList } from "redux/actions/classActions";

const StudentProfile = () => {
    const [showEditWindow, setShowEditWindow] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(
        (state) => state.studentProfile
    );

    console.log(loading);

    const deleteProfile = useSelector((state) => state.deleteStudentProfile);
    const classList = useSelector((state) => state.classList);
    const { studentId } = useParams();
    useEffect(() => {
        if (deleteProfile.success) {
            navigate("/students");
        }
        if (
            (!data && !deleteProfile.success) ||
            (studentId !== data._id && !deleteProfile.success)
        ) {
            dispatch(fetchStudentProfile(studentId));
        }

        if (!classList.data.length) {
            dispatch(loadClassList());
        }
    }, [studentId, deleteProfile]);

    const handleEditWindowState = () => {
        setShowEditWindow((prev) => !prev);
    };
    return (
        <>
            {loading && (
                    <LinearProgress
                        color="primary"
                        sx={{ width: "100%", overflow: "hidden" }}
                    />
                )}
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox mb={2}>
                    {data && classList.data && (
                        <Profile name={data.name} status={data.status}>
                            <MDBox mt={5} mb={3}>
                                <ProfileEdit
                                    open={showEditWindow}
                                    student={data}
                                    onClose={handleEditWindowState}
                                    classOptions={classList.data}
                                />
                                <Grid container spacing={1} sx={{}}>
                                    <Grid
                                        item
                                        xs={12}
                                        md={3}
                                        xl={3}
                                        sx={{ display: "flex" }}
                                    >
                                        <Divider
                                            orientation="vertical"
                                            sx={{ ml: -2, mr: 1 }}
                                        />
                                        <ProfileInfoCard
                                            title={"Student profile data"}
                                            info={{
                                                firstName: data.firstName,
                                                lastName: data.lastName,
                                                email: data.email,
                                                mobile: data.mobilePhoneNumber,
                                                secondaryMobile:
                                                    data.homeTelephoneNumber,
                                                birthdate: data.birthdate,
                                                status: data.status,
                                                address: data.address
                                                    ? `${data.address.street} ${data.address.suite}`
                                                    : "",
                                                location: data.address
                                                    ? `${data.address.postalCode}, ${data.address.city}`
                                                    : ``,
                                                branch: data.registeredOffice
                                                    ? data.registeredOffice
                                                          .officeName
                                                    : "",
                                                registeredBy:
                                                    data.createdBy.name,
                                                created: getDateAndTime(
                                                    data.createdAt
                                                ),
                                                updated: getDateAndTime(
                                                    data.updatedAt
                                                ),
                                            }}
                                            action={{
                                                function: handleEditWindowState,
                                                tooltip: "Edit Profile",
                                            }}
                                            shadow={false}
                                        />
                                        <Divider
                                            orientation="vertical"
                                            sx={{ mx: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={9} xl={9}>
                                        <ProfileNotes
                                            title="Notes"
                                            shadow={false}
                                            student={data}
                                        />
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Profile>
                    )}
                </MDBox>
                <Footer />
            </DashboardLayout>
        </>
    );
};

export default StudentProfile;
