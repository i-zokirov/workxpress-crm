// @mui material components
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadDashboardStats } from "redux/actions/dashboardStatsActions";

function Dashboard() {
    const { sales, tasks } = reportsLineChartData;

    const dispatch = useDispatch();

    const dashboardStats = useSelector((state) => state.dashboardStats);

    useEffect(() => {
        if (!dashboardStats.data) {
            dispatch(loadDashboardStats());
        }
    }, []);

    return (
        <>
            {dashboardStats.loading && (
                <LinearProgress
                    color="primary"
                    sx={{ width: "100%", overflow: "hidden" }}
                />
            )}
            <DashboardLayout>
                <DashboardNavbar />
                <MDBox py={3}>
                    <Grid container spacing={3}>
                        {dashboardStats.data && (
                            <>
                                <Grid item xs={12} md={6} lg={3}>
                                    <MDBox mb={1.5}>
                                        <ComplexStatisticsCard
                                            color="dark"
                                            icon="business"
                                            title="Offices/Branches"
                                            count={
                                                dashboardStats.data.officesCount
                                            }
                                            percentage={{
                                                color: "success",
                                                amount: "",
                                                label: "just updated",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <MDBox mb={1.5}>
                                        <ComplexStatisticsCard
                                            icon="group_add_icon"
                                            title="New registered students"
                                            count={
                                                dashboardStats.data
                                                    .newRegisteredStudentsCount
                                            }
                                            percentage={{
                                                color: "success",
                                                amount: "",
                                                label: "just updated",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <MDBox mb={1.5}>
                                        <ComplexStatisticsCard
                                            color="success"
                                            icon="account_box"
                                            title="Total students count"
                                            count={
                                                dashboardStats.data.allStudents
                                            }
                                            percentage={{
                                                color: "success",
                                                amount: "",
                                                label: "just updated",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <MDBox mb={1.5}>
                                        <ComplexStatisticsCard
                                            color="primary"
                                            icon="paid"
                                            title="Payments this month"
                                            count="7.8k"
                                            percentage={{
                                                color: "success",
                                                amount: "",
                                                label: "Just updated",
                                            }}
                                        />
                                    </MDBox>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <MDBox mt={4.5}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>
                                    <ReportsBarChart
                                        color="info"
                                        title="website views"
                                        description="Last Campaign Performance"
                                        date="campaign sent 2 days ago"
                                        chart={reportsBarChartData}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>
                                    <ReportsLineChart
                                        color="success"
                                        title="daily sales"
                                        description={
                                            <>
                                                (<strong>+15%</strong>) increase
                                                in today sales.
                                            </>
                                        }
                                        date="updated 4 min ago"
                                        chart={sales}
                                    />
                                </MDBox>
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <MDBox mb={3}>
                                    <ReportsLineChart
                                        color="dark"
                                        title="completed tasks"
                                        description="Last Campaign Performance"
                                        date="just updated"
                                        chart={tasks}
                                    />
                                </MDBox>
                            </Grid>
                        </Grid>
                    </MDBox>
                    <MDBox>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} lg={8}>
                                <Projects />
                            </Grid>
                            <Grid item xs={12} md={6} lg={4}>
                                <OrdersOverview />
                            </Grid>
                        </Grid>
                    </MDBox>
                </MDBox>
                <Footer />
            </DashboardLayout>
        </>
    );
}

export default Dashboard;
