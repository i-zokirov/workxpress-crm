import React from "react";
import Modal from "components/MUIModal";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import colors from "assets/theme/base/colors";
import MDInput from "components/MDInput";
import { Grid, Container } from "@mui/material";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import MDButton from "components/MDButton";

// formik
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "redux/actions/userActions";

const iconBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    color: "white",
    fontSize: "35px",
};

const ProfileEdit = ({ open, onClose, user }) => {
    const { socialMediaColors } = colors;

    const initialValues = {
        name: user.name,
        email: user.email,
        role: user.role,
        birthdate: user.birthdate,
        mobilePhoneNumber: user.mobilePhoneNumber ? user.mobilePhoneNumber : "",
        homeTelephoneNumber: user.homeTelephoneNumber
            ? user.homeTelephoneNumber
            : "",
        bio: user.bio ? user.bio : "",
        telegram: user.telegram ? user.telegram : "",
        facebook: user.facebook ? user.facebook : "",
        instagram: user.instagram ? user.instagram : "",
    };

    const dispatch = useDispatch();

    const handleFormSubmit = (values, { setSubmitting }) => {
        dispatch(updateUserProfile(values));
        setSubmitting(false);
        onClose();
    };

    const { loading } = useSelector((state) => state.updateProfile);

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="profile-edit"
            description="edit profile data"
        >
            <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <MDTypography
                            variant="h6"
                            fontWeight="medium"
                            textTransform="capitalize"
                        >
                            Edit profile data
                        </MDTypography>

                        <MDBox>
                            <MDAvatar
                                src="https://bit.ly/34BY10g"
                                alt="Avatar"
                                size="xxl"
                            />
                        </MDBox>
                        <Grid container spacing={2} sx={{ marginTop: "2px" }}>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="Full name"
                                    onChange={handleChange}
                                    name="name"
                                    value={values.name}
                                    disabled
                                    style={{ width: "90%" }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="email"
                                    label="Email"
                                    onChange={handleChange}
                                    name="email"
                                    value={values.email}
                                    disabled
                                    style={{ width: "90%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="Role"
                                    onChange={handleChange}
                                    name="role"
                                    value={values.role}
                                    disabled
                                    style={{ width: "90%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="date"
                                    label="Birthdate"
                                    onChange={handleChange}
                                    name="birthdate"
                                    value={values.birthdate}
                                    style={{ width: "90%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="tel"
                                    label="Mobile Phone"
                                    onChange={handleChange}
                                    name="mobilePhoneNumber"
                                    value={values.mobilePhoneNumber}
                                    style={{ width: "90%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="tel"
                                    label="Secondary Phone"
                                    onChange={handleChange}
                                    name="homeTelephoneNumber"
                                    value={values.homeTelephoneNumber}
                                    style={{ width: "90%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                                <MDInput
                                    multiline
                                    rows={4}
                                    label="Profile bio"
                                    onChange={handleChange}
                                    name="bio"
                                    value={values.bio}
                                    style={{ width: "95%" }}
                                />
                            </Grid>

                            <Grid item xs={12} md={12} xl={12}>
                                <MDBox
                                    color={socialMediaColors.telegram.main}
                                    borderRadius="50%"
                                    sx={iconBoxStyle}
                                >
                                    <TelegramIcon />
                                </MDBox>
                                <MDInput
                                    variant="standard"
                                    type="url"
                                    onChange={handleChange}
                                    name="telegram"
                                    value={values.telegram}
                                    label="Telegram URL"
                                    style={{ width: "85%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                                <MDBox
                                    color={socialMediaColors.facebook.main}
                                    borderRadius="50%"
                                    sx={iconBoxStyle}
                                >
                                    <FacebookIcon />
                                </MDBox>
                                <MDInput
                                    variant="standard"
                                    type="url"
                                    onChange={handleChange}
                                    name="facebook"
                                    value={values.facebook}
                                    label="Facebook URL"
                                    style={{ width: "85%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                                <MDBox
                                    color={socialMediaColors.instagram.main}
                                    borderRadius="50%"
                                    sx={iconBoxStyle}
                                >
                                    <InstagramIcon />
                                </MDBox>
                                <MDInput
                                    variant="standard"
                                    type="url"
                                    onChange={handleChange}
                                    name="instagram"
                                    value={values.instagram}
                                    label="Instagram URL"
                                    style={{ width: "85%" }}
                                />
                            </Grid>
                        </Grid>

                        <Container
                            sx={{
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "right",
                            }}
                        >
                            <MDBox sx={{ paddingRight: "5px" }}>
                                <MDButton
                                    variant="gradient"
                                    color="primary"
                                    size="medium"
                                    type="submit"
                                    disabled={loading}
                                >
                                    Save
                                </MDButton>
                            </MDBox>
                            <MDBox>
                                <MDButton
                                    variant="gradient"
                                    color="secondary"
                                    size="medium"
                                    onClick={onClose}
                                >
                                    Cancel
                                </MDButton>
                            </MDBox>
                        </Container>
                    </form>
                )}
            </Formik>
        </Modal>
    );
};

export default ProfileEdit;
