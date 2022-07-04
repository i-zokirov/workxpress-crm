import React from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const ProfileInfoCard = ({ title, info, action, shadow }) => {
    const labels = [];
    const values = [];

    // Convert this form `objectKey` of the object key in to this `object key`
    Object.keys(info).forEach((el) => {
        if (el.match(/[A-Z\s]+/)) {
            const uppercaseLetter = Array.from(el).find((i) =>
                i.match(/[A-Z]+/)
            );
            const newElement = el.replace(
                uppercaseLetter,
                ` ${uppercaseLetter.toLowerCase()}`
            );

            labels.push(newElement);
        } else {
            labels.push(el);
        }
    });

    // Push the object values into the values array
    Object.values(info).forEach((el) => values.push(el));

    // Render the card info items
    const renderItems = labels.map((label, key) => (
        <MDBox key={label} display="flex" py={1} pr={2}>
            <MDTypography
                variant="button"
                fontWeight="bold"
                textTransform="capitalize"
            >
                {label}: &nbsp;
            </MDTypography>
            <MDTypography variant="button" fontWeight="regular" color="text">
                &nbsp;{values[key]}
            </MDTypography>
        </MDBox>
    ));

    return (
        <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
            <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                px={2}
            >
                <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    textTransform="capitalize"
                >
                    {title}
                </MDTypography>
                <MDTypography
                    variant="body2"
                    color="secondary"
                    onClick={action.function}
                >
                    <Tooltip title={action.tooltip} placement="top">
                        <Icon>edit</Icon>
                    </Tooltip>
                </MDTypography>
            </MDBox>
            <MDBox p={2}>
                <MDBox opacity={0.3}>
                    <Divider />
                </MDBox>
                <MDBox>{renderItems}</MDBox>
            </MDBox>
        </Card>
    );
};

export default ProfileInfoCard;
