// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import LinearProgress from "@mui/material/LinearProgress";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import ProfileInfoCard from "layouts/profile/components/ProfileInfoCard";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "redux/actions/userActions";
import ProfileEdit from "./ProfileEdit";
import PasswordSettings from "./PasswordSettings";

const Overview = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.profile);

    const [showEditWindow, setShowEditWindow] = useState(false);

    const [image, setImage] = useState("");
    const handleEditWindowState = () => {
        setShowEditWindow((prev) => !prev);
    };
    useEffect(() => {
        if (!data) {
            dispatch(fetchUserProfile());
        }
    }, []);

    useEffect(() => {
        if (data) {
            setImage(data.image ? data.image.original : "");
        }
    }, [data]);
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
                {!loading && data && (
                    <Header
                        name={data.name}
                        role={data.role}
                        profileImage={image}
                    >
                        <MDBox mt={5} mb={3}>
                            <Grid container spacing={1}>
                                <ProfileEdit
                                    user={data}
                                    open={showEditWindow}
                                    onClose={handleEditWindowState}
                                    image={image}
                                    setImage={setImage}
                                />
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
                                    {data && (
                                        <ProfileInfoCard
                                            title="Short BIO"
                                            description={
                                                data.bio ? data.bio : ""
                                            }
                                            info={{
                                                fullName: data.name,
                                                mobile: data.mobilePhoneNumber,
                                                secondary:
                                                    data.homeTelephoneNumber,
                                                email: data.email,
                                                location: data.address
                                                    ? `${data.address.street}, ${data.address.city}`
                                                    : "",
                                                office: data.registeredOffice
                                                    ? data.registeredOffice
                                                          .officeName
                                                    : "",
                                            }}
                                            social={[
                                                {
                                                    link: "https://www.facebook.com/",
                                                    icon: <FacebookIcon />,
                                                    color: "facebook",
                                                },
                                                {
                                                    link: "https://telegram.org/",
                                                    icon: <TelegramIcon />,
                                                    color: "telegram",
                                                },
                                                {
                                                    link: "https://www.instagram.com/",
                                                    icon: <InstagramIcon />,
                                                    color: "instagram",
                                                },
                                            ]}
                                            action={{
                                                function: handleEditWindowState,
                                                tooltip: "Edit Profile",
                                            }}
                                            shadow={false}
                                        />
                                    )}
                                    <Divider
                                        orientation="vertical"
                                        sx={{ mx: 0 }}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6} xl={4}>
                                    <PlatformSettings />
                                </Grid>
                                <Grid item xs={12} xl={4}>
                                    <PasswordSettings />
                                </Grid>
                            </Grid>
                        </MDBox>
                    </Header>
                )}
                <Footer />
            </DashboardLayout>
        </>
    );
};

export default Overview;
