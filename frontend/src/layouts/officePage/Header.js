// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import BusinessIcon from "@mui/icons-material/Business";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function Header({ children, name, image }) {
    return (
        <MDBox position="relative" mb={5}>
            <MDBox
                display="flex"
                alignItems="center"
                position="relative"
                minHeight="18.75rem"
                borderRadius="xl"
                sx={{
                    backgroundImage: ({
                        functions: { rgba, linearGradient },
                        palette: { gradients },
                    }) =>
                        `${linearGradient(
                            rgba(gradients.info.main, 0.1),
                            rgba(gradients.info.state, 0.1)
                        )}, url(${image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50%",
                    overflow: "hidden",
                }}
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
                        <MDBox sx={{ fontSize: "60px" }}>
                            <BusinessIcon size="xxl" variant="rounded" />
                        </MDBox>
                    </Grid>
                    <Grid item>
                        <MDBox height="100%" mt={0.5} lineHeight={1}>
                            <MDTypography variant="h5" fontWeight="medium">
                                {name}
                            </MDTypography>
                        </MDBox>
                    </Grid>
                </Grid>
                {children}
            </Card>
        </MDBox>
    );
}

// Setting default props for the Header
Header.defaultProps = {
    children: "",
};

// Typechecking props for the Header
Header.propTypes = {
    children: PropTypes.node,
};

export default Header;
