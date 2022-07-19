// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import buildTableDate from "layouts/staff/data/buildTableData";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStaffList } from "redux/actions/staffActions";
import { Container, LinearProgress } from "@mui/material";
import StaffCreate from "./StaffCreate";
import { loadOfficeList } from "redux/actions/officeActions";

const Staff = () => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [openCreateModal, setOpenCreateModel] = useState(false);

    const handleModelState = () => {
        setOpenCreateModel((prev) => !prev);
    };
    const dispatch = useDispatch();

    const { list, error, loading } = useSelector((state) => state.staff);
    const user = useSelector((state) => state.auth.userData);
    const offices = useSelector((state) => state.offices);

    useEffect(() => {
        if (!list.length) {
            dispatch(loadStaffList());
        }
        if (!offices.list.length) {
            dispatch(loadOfficeList());
        }
    }, []);

    useEffect(() => {
        if (list.length) {
            const { columns, rows } = buildTableDate(list);
            setRows(rows);
            setColumns(columns);
        }
    }, [list]);

    return (
        <>
            <DashboardLayout>
                <DashboardNavbar />
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
                                    <MDTypography variant="h6" color="white">
                                        Staff/Employees {error && `: ${error}`}
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    {loading ? (
                                        <Container maxWidth="sm">
                                            <LinearProgress color="info" />
                                        </Container>
                                    ) : (
                                        list.length && (
                                            <DataTable
                                                table={{ columns, rows }}
                                                isSorted={true}
                                                entriesPerPage={true}
                                                showTotalEntries={true}
                                                noEndBorder
                                            />
                                        )
                                    )}
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
                <Footer />
            </DashboardLayout>
            {user.role === "Administrator" && (
                <>
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
                        onClick={handleModelState}
                    >
                        <Tooltip title="Add new employee" placement="top-start">
                            <Icon fontSize="small" color="inherit">
                                add_circle_outline_icon
                            </Icon>
                        </Tooltip>
                    </MDBox>

                    {offices.list.length && (
                        <StaffCreate
                            open={openCreateModal}
                            onClose={handleModelState}
                            offices={offices.list}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default Staff;
