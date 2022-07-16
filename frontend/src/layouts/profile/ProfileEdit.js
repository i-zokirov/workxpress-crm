import React, { useState } from "react";
import Modal from "components/MUIModal";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import colors from "assets/theme/base/colors";
import MDInput from "components/MDInput";
import { Grid, Container, IconButton, Divider } from "@mui/material";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import MDButton from "components/MDButton";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// formik
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "redux/actions/userActions";

import axios from "axios";
import baseUrl from "baseUrl";
import MDAlert from "components/MDAlert";

const iconBoxStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50px",
    color: "white",
    fontSize: "35px",
};

const ProfileEdit = ({ open, onClose, user, image, setImage }) => {
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
        street: user.address ? user.address.street : "",
        suite: user.address ? user.address.suite : "",
        postalCode: user.address ? user.address.postalCode : "",
        city: user.address ? user.address.city : "",
    };

    const dispatch = useDispatch();

    const handleFormSubmit = (values, { setSubmitting }) => {
        const reqBody = {
            birthdate: values.birthdate,
            mobilePhoneNumber: values.mobilePhoneNumber,
            homeTelephoneNumber: values.homeTelephoneNumber,
            bio: values.bio,
            telegram: values.telegram,
            facebook: values.facebook,
            instagram: values.instagram,
            address: {
                street: values.street,
                suite: values.suite,
                postalCode: values.postalCode,
                city: values.city,
            },
        };
        dispatch(updateUserProfile(reqBody));
        setSubmitting(false);
        onClose();
    };

    const { loading } = useSelector((state) => state.updateProfile);
    const userData = useSelector((state) => state.auth.userData);
    const [disableUploadBtn, setDisableUploadBtn] = useState(false);

    const [uploadError, setUploadError] = useState(null);

    const handleUpload = async (e) => {
        const file = e.target.files[0];

        setDisableUploadBtn(true);
        const formdata = new FormData();
        formdata.append("image", file);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userData.token}`,
                },
            };

            const { data } = await axios.post(
                `/api/users/${user._id}/upload`,
                formdata,
                config
            );
            setImage(data.original);
        } catch (error) {
            const err =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            console.log(err);
            setUploadError(err);
            setTimeout(() => {
                setUploadError(null);
            }, 5000);
        }
        setDisableUploadBtn(false);
    };
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

                        <MDBox
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                            }}
                        >
                            <MDAvatar src={image} alt="Avatar" size="xxl" />
                            <MDBox>
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                    size="large"
                                    disabled={disableUploadBtn}
                                >
                                    <input
                                        hidden
                                        accept="image/*"
                                        type="file"
                                        onChange={handleUpload}
                                    />
                                    <AddAPhotoIcon />
                                </IconButton>
                            </MDBox>
                            {uploadError && (
                                <MDAlert color="error" dismissible>
                                    {uploadError}
                                </MDAlert>
                            )}
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
                                    style={{ width: "100%" }}
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
                                    style={{ width: "100%" }}
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
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="date"
                                    label="Birthdate"
                                    onChange={handleChange}
                                    name="birthdate"
                                    value={values.birthdate}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="tel"
                                    label="Mobile Phone"
                                    onChange={handleChange}
                                    name="mobilePhoneNumber"
                                    value={values.mobilePhoneNumber}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="tel"
                                    label="Secondary Phone (optional)"
                                    onChange={handleChange}
                                    name="homeTelephoneNumber"
                                    value={values.homeTelephoneNumber}
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="Street"
                                    onChange={handleChange}
                                    name="street"
                                    value={values.street}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="Suite"
                                    onChange={handleChange}
                                    name="suite"
                                    value={values.suite}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="Postal code"
                                    onChange={handleChange}
                                    name="postalCode"
                                    value={values.postalCode}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="City"
                                    onChange={handleChange}
                                    name="city"
                                    value={values.city}
                                    style={{ width: "100%" }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                                <MDInput
                                    multiline
                                    rows={6}
                                    label="Profile bio"
                                    onChange={handleChange}
                                    name="bio"
                                    value={values.bio}
                                    style={{ width: "100%" }}
                                    placeholder="Tell a little about yourself..."
                                    required
                                />
                            </Grid>

                            <Divider />

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
                                    style={{ width: "100%" }}
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
                                    style={{ width: "100%" }}
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
                                    style={{ width: "100%" }}
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
