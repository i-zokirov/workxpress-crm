// react-routers components
import { Link } from "react-router-dom";

// prop-types is library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";

function EmployeesList({ title, employees, shadow }) {
    const renderProfiles = employees.map(
        ({ image, name, mobilePhoneNumber, role, _id }) => (
            <MDBox
                key={name}
                component="li"
                display="flex"
                alignItems="center"
                py={1}
                mb={1}
            >
                <MDBox mr={2}>
                    <MDAvatar
                        src={image.thumbnail}
                        alt="something here"
                        shadow="md"
                    />
                </MDBox>
                <MDBox
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    <MDTypography variant="button" fontWeight="medium">
                        {name}
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                        {role} | {mobilePhoneNumber}
                    </MDTypography>
                </MDBox>
                <MDBox ml="auto">
                    <MDButton
                        component={Link}
                        to={`/staff/${_id}`}
                        variant="text"
                        color="info"
                    >
                        View
                    </MDButton>
                </MDBox>
            </MDBox>
        )
    );

    return (
        <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
            <MDBox pt={2} px={2}>
                <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    textTransform="capitalize"
                >
                    {title}
                </MDTypography>
            </MDBox>
            <MDBox p={2}>
                <MDBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={0}
                    m={0}
                >
                    {renderProfiles}
                </MDBox>
            </MDBox>
        </Card>
    );
}

// Setting default props for the ProfilesList
EmployeesList.defaultProps = {
    shadow: true,
};

// Typechecking props for the ProfilesList
EmployeesList.propTypes = {
    title: PropTypes.string.isRequired,
    employees: PropTypes.arrayOf(PropTypes.object).isRequired,
    shadow: PropTypes.bool,
};

export default EmployeesList;
