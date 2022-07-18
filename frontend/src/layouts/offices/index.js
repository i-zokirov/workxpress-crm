// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { LinearProgress, Container, Icon } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data

import buildTableData from "layouts/offices/data/buildTableData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOfficeList } from "redux/actions/officeActions";
import OfficeCreate from "./OfficeCreate";
import { useNavigate } from "react-router-dom";

const OfficesTable = () => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [openCreateModal, setOpenCreateModel] = useState(false);

    const handleOpenModalChange = () => {
        setOpenCreateModel((prev) => !prev);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { list, error, loading } = useSelector((state) => state.offices);

    const { data: newOffice } = useSelector((state) => state.createOffice);
    const user = useSelector((state) => state.auth.userData);
    useEffect(() => {
        if (!list.length) {
            dispatch(loadOfficeList());
        }
    }, []);

    useEffect(() => {
        if (list.length) {
            const { columns, rows } = buildTableData(list);
            setRows(rows);
            setColumns(columns);
        }
    }, [list]);

    useEffect(() => {
        if (newOffice) {
            navigate(`/offices/${newOffice._id}`);
        }
    }, [newOffice]);

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
                                        Offices
                                    </MDTypography>
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
                        onClick={handleOpenModalChange}
                    >
                        <Icon fontSize="small" color="inherit">
                            add_circle_outline_icon
                        </Icon>
                    </MDBox>

                    <OfficeCreate
                        open={openCreateModal}
                        onClose={handleOpenModalChange}
                    />
                </>
            )}
        </>
    );
};

export default OfficesTable;
