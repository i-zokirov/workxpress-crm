// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import LinearProgress from "@mui/material/LinearProgress";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import buildTableData from "layouts/students/data/buildTableData";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadStudentsList } from "redux/actions/studentActions";
import ProfileCreate from "./ProfileCreate";

import { loadClassList } from "redux/actions/classActions";
import { useNavigate } from "react-router-dom";
import { loadOfficeList } from "redux/actions/officeActions";

const Students = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Handling create student window
    const [openCreateStudentWindow, setOpenCreateStudentWindow] =
        useState(false);

    const handleCreateStudentWindowStateChange = () => {
        setOpenCreateStudentWindow((prev) => !prev);
    };
    const classList = useSelector((state) => state.classList);
    const offices = useSelector((state) => state.offices);
    const createStudentProfile = useSelector(
        (state) => state.createStudentProfile
    );

    useEffect(() => {
        if (createStudentProfile.data) {
            navigate(`/students/${createStudentProfile.data._id}`);
        }
    }, [createStudentProfile]);

    // Handling students table data
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    // dispatch request to load data when page loads
    useEffect(() => {
        if (!list.length) {
            dispatch(loadStudentsList());
        }
        if (!classList.data.length) {
            dispatch(loadClassList());
        }
        if (!offices.list.length) {
            dispatch(loadOfficeList());
        }
    }, []);

    const handleRefresh = () => {
        dispatch(loadStudentsList());
    };

    // get students data from redux
    const { list, error, loading } = useSelector((state) => state.students);

    // keep track of students list
    useEffect(() => {
        const { columns, rows } = buildTableData(list);
        setRows(rows);
        setColumns(columns);
    }, [list]);

    return (
        <>
            {loading && (
                <LinearProgress
                    color="primary"
                    sx={{ width: "100%", overflow: "hidden" }}
                />
            )}
            {createStudentProfile.loading && (
                <LinearProgress
                    color="primary"
                    sx={{ width: "100%", overflow: "hidden" }}
                />
            )}
            <DashboardLayout>
                <DashboardNavbar useSettings={false} />
                <MDBox pt={6} pb={3}>
                    <Grid container spacing={6}>
                        <Grid item xs={12}>
                            <Card>
                                <MDBox
                                    mx={2}
                                    mt={-3}
                                    py={3}
                                    px={2}
                                    variant="gradient"
                                    bgColor={error ? "error" : "info"}
                                    borderRadius="lg"
                                    coloredShadow={error ? "error" : "info"}
                                >
                                    <MDBox
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <MDTypography
                                            variant="h6"
                                            color="white"
                                        >
                                            Students {error && `: ${error}`}
                                        </MDTypography>
                                        <MDButton
                                            size={"medium"}
                                            iconOnly={true}
                                            onClick={handleRefresh}
                                        >
                                            <Icon
                                                fontSize="large"
                                                sx={{ fontSize: "100px" }}
                                            >
                                                refresh_icon
                                            </Icon>
                                        </MDButton>
                                    </MDBox>
                                </MDBox>
                                <MDBox pt={3}>
                                    {list.length && (
                                        <DataTable
                                            table={{ columns, rows }}
                                            isSorted={true}
                                            entriesPerPage={true}
                                            showTotalEntries={true}
                                            canSearch={false}
                                            noEndBorder
                                        />
                                    )}
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>

                {classList.data && offices.list && (
                    <ProfileCreate
                        open={openCreateStudentWindow}
                        onClose={handleCreateStudentWindowStateChange}
                        classOptions={classList.data}
                        officeOptions={offices.list}
                    />
                )}

                <Footer />
            </DashboardLayout>
            <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="3.25rem"
                height="3.25rem"
                bgColor="primary"
                shadow="sm"
                borderRadius="50%"
                position="fixed"
                right="2rem"
                bottom="2rem"
                zIndex={99}
                color="white"
                sx={{ cursor: "pointer" }}
                onClick={handleCreateStudentWindowStateChange}
            >
                <Icon fontSize="small" color="inherit">
                    add_circle_outline_icon
                </Icon>
            </MDBox>
        </>
    );
};

export default Students;
