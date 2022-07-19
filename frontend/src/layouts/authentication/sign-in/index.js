import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// react-router-dom components
import { useNavigate, useLocation } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { authenticateUser } from "redux/actions/userActions";

const SignIn = () => {
    const [rememberMe, setRememberMe] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState(null);
    const [openNewPasswordFields, setOpenNewPasswordFields] = useState(false);

    const { loading, error, authenticated } = useSelector(
        (state) => state.auth
    );

    const handleInputChange = (e) => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "newPassword":
                setNewPassword(e.target.value);
                break;
            case "confirmPassword":
                setConfirmPassword(e.target.value);
                break;
        }
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSetRememberMe = () => setRememberMe(!rememberMe);

    const handleFormSubmit = () => {
        let reqbody = null;
        if (openNewPasswordFields) {
            if (newPassword !== confirmpassword) {
                setMessage({
                    text: "Please make sure new passwords entered match!",
                    type: "error",
                });
                return;
            }
            if (email && password && newPassword)
                reqbody = {
                    email,
                    password,
                    newPassword,
                };
        } else {
            if (email && password)
                reqbody = {
                    email,
                    password,
                };
        }
        if (reqbody) dispatch(authenticateUser(reqbody));
    };

    useEffect(() => {
        if (authenticated) {
            navigate("/dashboard");
        }

        if (error && error.message) {
            const expiredPasswordMessage =
                "Your password has expired. \nPlease kindly reset your password!";
            if (error.message === "Password expired") {
                setOpenNewPasswordFields(true);
                setPassword("");
            }

            setMessage({
                text:
                    error.message === "Password expired"
                        ? expiredPasswordMessage
                        : error.message,
                type: error.type,
            });

            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
    }, [authenticated, error]);

    return (
        <BasicLayout image={bgImage}>
            {message && (
                <MDAlert
                    style={{ marginBottom: "30px" }}
                    color={message.type}
                    dismissible
                >
                    <MDTypography variant="subtitle2" color="white">
                        {message.text}
                    </MDTypography>
                </MDAlert>
            )}
            <Card>
                <MDBox
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    mx={2}
                    mt={-3}
                    p={2}
                    mb={1}
                    textAlign="center"
                >
                    <MDTypography
                        variant="h4"
                        fontWeight="medium"
                        color="white"
                        mt={1}
                    >
                        Sign in
                    </MDTypography>
                </MDBox>
                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput
                                type="email"
                                name="email"
                                label="Email"
                                fullWidth
                                value={email}
                                onChange={handleInputChange}
                                required
                            />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput
                                type="password"
                                required
                                name="password"
                                label={
                                    openNewPasswordFields
                                        ? "Current password"
                                        : "Password"
                                }
                                fullWidth
                                value={password}
                                onChange={handleInputChange}
                            />
                        </MDBox>
                        {openNewPasswordFields && (
                            <>
                                <MDBox mb={2}>
                                    <MDInput
                                        type="password"
                                        required
                                        name="newPassword"
                                        label="New Password"
                                        fullWidth
                                        value={newPassword}
                                        onChange={handleInputChange}
                                    />
                                </MDBox>
                                <MDBox mb={2}>
                                    <MDInput
                                        type="password"
                                        required
                                        name="confirmPassword"
                                        label="Re-enter new password"
                                        fullWidth
                                        value={confirmpassword}
                                        onChange={handleInputChange}
                                    />
                                </MDBox>
                            </>
                        )}
                        <MDBox display="flex" alignItems="center" ml={-1}>
                            <Switch
                                checked={rememberMe}
                                onChange={handleSetRememberMe}
                            />
                            <MDTypography
                                variant="button"
                                fontWeight="regular"
                                color="text"
                                onClick={handleSetRememberMe}
                                sx={{
                                    cursor: "pointer",
                                    userSelect: "none",
                                    ml: -1,
                                }}
                            >
                                &nbsp;&nbsp;Remember me
                            </MDTypography>
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            {!loading ? (
                                <MDButton
                                    variant="gradient"
                                    color="info"
                                    type="submit"
                                    fullWidth
                                    onClick={handleFormSubmit}
                                >
                                    sign in
                                </MDButton>
                            ) : (
                                <LoadingButton
                                    fullWidth
                                    loadingPosition="start"
                                    startIcon={<SaveIcon />}
                                    loading
                                    variant="outlined"
                                >
                                    SIGN IN
                                </LoadingButton>
                            )}
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Card>
        </BasicLayout>
    );
};

export default SignIn;
