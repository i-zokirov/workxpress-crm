// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import OfficeCard from "./officeInfoCard";
import Header from "./Header";
import EmployeesList from "./EmployeesList";
import OfficeEdit from "./OfficeEdit.js";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadOffice } from "redux/actions/officeActions";

const Overview = () => {
    const { officeId } = useParams();
    const dispatch = useDispatch();

    const { data, loading } = useSelector((state) => state.office);
    const user = useSelector((state) => state.auth.userData);
    useEffect(() => {
        dispatch(loadOffice(officeId));
    }, [officeId]);

    const [openEditWindow, setOpenEditWindow] = useState(false);
    const [image, setImage] = useState("");

    useEffect(() => {
        console.log(image);
        if (data) {
            setImage(data.image ? data.image.banner : "");
        }
    }, [data]);
    const handleOpenEditWindowChange = () => {
        setOpenEditWindow((prev) => !prev);
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
                <MDBox mb={2} />
                {data && user && (
                    <>
                        {user.role === "Administrator" && (
                            <OfficeEdit
                                image={image}
                                setImage={setImage}
                                office={data}
                                onClose={handleOpenEditWindowChange}
                                open={openEditWindow}
                                user={user}
                            />
                        )}

                        <Header name={data.officeName} image={image}>
                            <MDBox mt={5} mb={3}>
                                <Grid container spacing={1}>
                                    <Grid
                                        item
                                        xs={12}
                                        md={6}
                                        xl={4}
                                        sx={{ display: "flex" }}
                                    >
                                        <Divider
                                            orientation="vertical"
                                            sx={{ ml: -2, mr: 1 }}
                                        />
                                        <OfficeCard
                                            title="Office information"
                                            description=""
                                            useAction={true}
                                            info={{
                                                officeName: data.officeName,
                                                telephone: data.phone,
                                                streetName: `${data.address.street} ${data.address.suite}`,
                                                postalCode:
                                                    data.address.postalCode,
                                                city: data.address.city,
                                                officeManager: (
                                                    <Link
                                                        to={`/staff/${data.manager._id}`}
                                                        style={{
                                                            textDecoration:
                                                                "underline",
                                                            color: "inherit",
                                                        }}
                                                    >
                                                        {data.manager.name}
                                                    </Link>
                                                ),
                                                managerContact:
                                                    data.manager
                                                        .mobilePhoneNumber,
                                            }}
                                            action={{
                                                function:
                                                    handleOpenEditWindowChange,
                                                tooltip: "Edit Profile",
                                            }}
                                            shadow={false}
                                        />
                                        <Divider
                                            orientation="vertical"
                                            sx={{ mx: 0 }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} xl={8}>
                                        <EmployeesList
                                            title="staff"
                                            employees={data.employees}
                                            shadow={false}
                                        />
                                    </Grid>
                                </Grid>
                            </MDBox>
                        </Header>
                    </>
                )}

                <Footer />
            </DashboardLayout>
        </>
    );
};

export default Overview;
