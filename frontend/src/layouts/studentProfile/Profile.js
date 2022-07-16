import React, { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React base styles
import breakpoints from "assets/theme/base/breakpoints";

const assignColor = (status) => {
    switch (status) {
        case "Student":
            return "info";
        case "New Applicant":
            return "success";
        case "Alumni":
            return "warning";
        case "Graduated":
            return "primary";
        case "Drop-out":
            return "dark";
    }
};

const Profile = ({ name, status, children, profileImage }) => {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        // A function that sets the orientation state of the tabs.
        function handleTabsOrientation() {
            return window.innerWidth < breakpoints.values.sm
                ? setTabsOrientation("vertical")
                : setTabsOrientation("horizontal");
        }

        /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
        window.addEventListener("resize", handleTabsOrientation);

        // Call the handleTabsOrientation function to set the state with the initial value.
        handleTabsOrientation();

        // Remove event listener on cleanup
        return () =>
            window.removeEventListener("resize", handleTabsOrientation);
    }, [tabsOrientation]);

    const handleSetTabValue = (event, newValue) => setTabValue(newValue);

    return (
        <MDBox position="relative" mb={5}>
            <MDBox
                display="flex"
                alignItems="center"
                position="relative"
                minHeight="5.75rem"
                borderRadius="xl"
            />
            <Card
                sx={{
                    position: "relative",
                    mt: -8,
                    mx: 3,
                    py: 2,
                    px: 2,
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    <Grid item>
                        <MDAvatar
                            src={profileImage}
                            alt="profile-image"
                            size="xxl"
                            shadow="sm"
                        />
                    </Grid>

                    <Grid item>
                        <MDBox height="100%" mt={0.5} lineHeight={1}>
                            <MDTypography variant="h5" fontWeight="medium">
                                {name}
                            </MDTypography>
                            <MDBox>
                                <MDBadge
                                    badgeContent={status}
                                    color={assignColor(status)}
                                    variant="gradient"
                                    size="sm"
                                />
                            </MDBox>
                        </MDBox>
                    </Grid>

                    <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
                        <AppBar position="static">
                            <Tabs
                                orientation={tabsOrientation}
                                value={tabValue}
                                onChange={handleSetTabValue}
                            >
                                <Tab
                                    label="Profile"
                                    icon={
                                        <Icon
                                            fontSize="small"
                                            sx={{ mt: -0.25 }}
                                        >
                                            account_box_icon
                                        </Icon>
                                    }
                                />
                                <Tab
                                    label="Class"
                                    icon={
                                        <Icon
                                            fontSize="small"
                                            sx={{ mt: -0.25 }}
                                        >
                                            calendar_month
                                        </Icon>
                                    }
                                />
                            </Tabs>
                        </AppBar>
                    </Grid>
                </Grid>
                {children}
            </Card>
        </MDBox>
    );
};

export default Profile;
