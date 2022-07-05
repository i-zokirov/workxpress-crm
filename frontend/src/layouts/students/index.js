// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import LinearProgress from "@mui/material/LinearProgress";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

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

function Tables() {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const dispatch = useDispatch();

    // dispatch request to load data when page loads
    useEffect(() => {
        if (!list.length) {
            dispatch(loadStudentsList());
        }
    }, []);

    // get data from redux
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
                                        Students {error && `: ${error}`}
                                    </MDTypography>
                                </MDBox>
                                <MDBox pt={3}>
                                    {list.length && (
                                        <DataTable
                                            table={{ columns, rows }}
                                            isSorted={false}
                                            entriesPerPage={false}
                                            showTotalEntries={false}
                                            noEndBorder
                                        />
                                    )}
                                </MDBox>
                            </Card>
                        </Grid>
                    </Grid>
                </MDBox>
                <Footer />
            </DashboardLayout>
        </>
    );
}

export default Tables;
