import React, { useState } from "react";
import Modal from "components/MUIModal";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import MDInput from "components/MDInput";
import { Grid, Container, IconButton, Divider } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
// formik
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOffice } from "redux/actions/officeActions";

const OfficeCreate = ({ onClose, open }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.createOffice);

    const initialValues = {
        officeName: "",
        phone: "",
        street: "",
        suite: "",
        postalCode: "",
        city: "",
    };

    const handleFormSubmit = (values, { setSubmitting }) => {
        const reqbody = {
            officeName: values.officeName,
            phone: values.phone,
            address: {
                street: values.street,
                suite: values.suite,
                postalCode: values.postalCode,
                city: values.city,
            },
        };

        dispatch(createOffice(reqbody));
        setSubmitting(false);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Office Create"
            description="create office profile data"
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
                            Create new Office
                        </MDTypography>

                        <MDBox
                            component="span"
                            sx={{
                                fontSize: "80px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                marginBottom: "15px",
                            }}
                        >
                            <BusinessIcon size="xxl" variant="rounded" />
                        </MDBox>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="Office name"
                                    onChange={handleChange}
                                    name="officeName"
                                    value={values.officeName}
                                    required
                                    style={{ width: "100%" }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="tel"
                                    label="Telephone"
                                    onChange={handleChange}
                                    name="phone"
                                    value={values.phone}
                                    required
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="Street name"
                                    onChange={handleChange}
                                    name="street"
                                    value={values.street}
                                    required
                                    style={{ width: "100%" }}
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

export default OfficeCreate;
