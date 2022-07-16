import React, { useEffect, useState } from "react";
// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "redux/actions/userActions";

const PasswordSettings = () => {
    const dispatch = useDispatch();
    const passwordReset = useSelector((state) => state.updatePassword);
    const handleFormSubmit = async (values, { setSubmitting,resetForm  }) => {
        if (values.newPassword === values.confirmPassword) {
            const reqbody = {
                password: values.password,
                newPassword: values.newPassword,
            };
            dispatch(updateUserPassword(reqbody));
            resetForm()
        }
        setSubmitting(false);
    };

    useEffect(() => {}, [passwordReset]);
    return (
        <Card sx={{ boxShadow: "none" }}>
            <MDBox p={2}>
                <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    textTransform="capitalize"
                >
                    Manage Password
                </MDTypography>

                <Formik
                    initialValues={{
                        password: "",
                        newPassword: "",
                        confirmPassword: "",
                    }}
                    onSubmit={handleFormSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            autoComplete="off"
                        >
                            <MDBox pt={3} px={0} lineHeight={1.25}>
                                <MDInput
                                    type="password"
                                    label="Current password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        bgColor: "transparent",
                                    }}
                                />
                            </MDBox>
                            <MDBox pt={3} px={0} lineHeight={1.25}>
                                <MDInput
                                    type="password"
                                    label="New password"
                                    name="newPassword"
                                    value={values.newPassword}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        bgColor: "transparent",
                                    }}
                                />
                            </MDBox>
                            <MDBox pt={3} px={0} lineHeight={1.25}>
                                <MDInput
                                    type="password"
                                    label="Confirm new password"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    style={{
                                        width: "100%",
                                        bgColor: "transparent",
                                    }}
                                />
                            </MDBox>
                            <MDBox
                                pt={3}
                                px={0}
                                lineHeight={1.25}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <MDButton
                                    variant="gradient"
                                    color="primary"
                                    size="medium"
                                    type="submit"
                                    disabled={passwordReset.loading}
                                >
                                    Update
                                </MDButton>
                            </MDBox>
                        </form>
                    )}
                </Formik>
            </MDBox>
        </Card>
    );
};

export default PasswordSettings;
