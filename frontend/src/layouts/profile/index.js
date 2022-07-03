// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

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

import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import ProfileInfoCard from "layouts/profile/components/ProfileInfoCard";
// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserProfile } from "redux/actions/userActions";
import ProfileEdit from "./ProfileEdit";

const Overview = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.profile);

    const [showEditWindow, setShowEditWindow] = useState(false);

    const handleEditWindowState = () => {
        setShowEditWindow((prev) => !prev);
    };
    useEffect(() => {
        if (!data) {
            dispatch(fetchUserProfile());
        }
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox mb={2} />
            {!loading && data && (
                <Header name={data.name} role={data.role}>
                    <MDBox mt={5} mb={3}>
                        <Grid container spacing={1}>
                            <ProfileEdit
                                user={data}
                                open={showEditWindow}
                                onClose={handleEditWindowState}
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
                                        description={data.bio ? data.bio : ""}
                                        info={{
                                            fullName: data.name,
                                            mobile: data.mobilePhoneNumber,
                                            secondary: data.homeTelephoneNumber,
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
                                <ProfilesList
                                    title="conversations"
                                    profiles={profilesListData}
                                    shadow={false}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                    <MDBox pt={2} px={2} lineHeight={1.25}>
                        <MDTypography variant="h6" fontWeight="medium">
                            Projects
                        </MDTypography>
                        <MDBox mb={1}>
                            <MDTypography variant="button" color="text">
                                Architects design houses
                            </MDTypography>
                        </MDBox>
                    </MDBox>
                    <MDBox p={2}>
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={6} xl={3}>
                                <DefaultProjectCard
                                    image={homeDecor1}
                                    label="project #2"
                                    title="modern"
                                    description="As Uber works through a huge amount of internal management turmoil."
                                    action={{
                                        type: "internal",
                                        route: "/pages/profile/profile-overview",
                                        color: "info",
                                        label: "view project",
                                    }}
                                    authors={[
                                        { image: team1, name: "Elena Morison" },
                                        { image: team2, name: "Ryan Milly" },
                                        { image: team3, name: "Nick Daniel" },
                                        { image: team4, name: "Peterson" },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={3}>
                                <DefaultProjectCard
                                    image={homeDecor2}
                                    label="project #1"
                                    title="scandinavian"
                                    description="Music is something that everyone has their own specific opinion about."
                                    action={{
                                        type: "internal",
                                        route: "/pages/profile/profile-overview",
                                        color: "info",
                                        label: "view project",
                                    }}
                                    authors={[
                                        { image: team3, name: "Nick Daniel" },
                                        { image: team4, name: "Peterson" },
                                        { image: team1, name: "Elena Morison" },
                                        { image: team2, name: "Ryan Milly" },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={3}>
                                <DefaultProjectCard
                                    image={homeDecor3}
                                    label="project #3"
                                    title="minimalist"
                                    description="Different people have different taste, and various types of music."
                                    action={{
                                        type: "internal",
                                        route: "/pages/profile/profile-overview",
                                        color: "info",
                                        label: "view project",
                                    }}
                                    authors={[
                                        { image: team4, name: "Peterson" },
                                        { image: team3, name: "Nick Daniel" },
                                        { image: team2, name: "Ryan Milly" },
                                        { image: team1, name: "Elena Morison" },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={3}>
                                <DefaultProjectCard
                                    image={homeDecor4}
                                    label="project #4"
                                    title="gothic"
                                    description="Why would anyone pick blue over pink? Pink is obviously a better color."
                                    action={{
                                        type: "internal",
                                        route: "/pages/profile/profile-overview",
                                        color: "info",
                                        label: "view project",
                                    }}
                                    authors={[
                                        { image: team4, name: "Peterson" },
                                        { image: team3, name: "Nick Daniel" },
                                        { image: team2, name: "Ryan Milly" },
                                        { image: team1, name: "Elena Morison" },
                                    ]}
                                />
                            </Grid>
                        </Grid>
                    </MDBox>
                </Header>
            )}
            <Footer />
        </DashboardLayout>
    );
};

export default Overview;
