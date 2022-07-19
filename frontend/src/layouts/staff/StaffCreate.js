import React, { useEffect, useState } from "react";
import Modal from "components/MUIModal";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
import Select from "components/Select";
import colors from "assets/theme/base/colors";
import MDInput from "components/MDInput";
import {
    Grid,
    Container,
    IconButton,
    Divider,
    FormControl,
    Tooltip,
} from "@mui/material";

import KeyIcon from "@mui/icons-material/Key";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";

import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createOffice } from "redux/actions/officeActions";

import generatePassword from "utils/generatePassword";
import { createStaff } from "redux/actions/staffActions";

const genderOptions = [
    {
        label: "Male",
        value: "Male",
    },
    {
        label: "Female",
        value: "Female",
    },
    {
        label: "Other",
        value: "Other",
    },
];

const roles = [
    {
        label: "Administrator",
        value: "Administrator",
    },
    {
        label: "Teacher",
        value: "Teacher",
    },
    {
        label: "Receptionist",
        value: "Receptionist",
    },
];

const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    registeredOffice: "",
    role: "",
};

const extractOfficeOptions = (offices) => {
    const options = [];
    for (let office of offices) {
        options.push({ label: office.officeName, value: office._id });
    }
    return options;
};

const StaffCreate = ({ onClose, open, offices }) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [createError, setError] = useState(null);

    const { loading, error, success } = useSelector(
        (state) => state.createStaff
    );

    useEffect(() => {
        if (error) {
            setError(error);
            setTimeout(() => {
                setError(null);
            }, 5000);
        }

        if (success) {
            onClose();
        }
    }, [error, success]);
    const handleFormSubmit = (values, { setSubmitting }) => {
        const reqbody = {
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            email: values.email,
            role: values.role,
            registeredOffice: values.registeredOffice,
            password,
        };

        dispatch(createStaff(reqbody));
        setSubmitting(false);
    };

    const genPassword = (e) => {
        e.preventDefault();
        const password = generatePassword(12);

        setPassword(password);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="register new user"
            description="register new user"
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
                            Register New Employee
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
                            <PermIdentityIcon size="xxl" variant="rounded" />
                        </MDBox>
                        {createError && (
                            <MDAlert color={"error"} dismissible>
                                <MDTypography variant="subtitle2" color="white">
                                    {createError}
                                </MDTypography>
                            </MDAlert>
                        )}
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="First name"
                                    onChange={handleChange}
                                    name="firstName"
                                    value={values.firstName}
                                    required
                                    style={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="Last name"
                                    onChange={handleChange}
                                    name="lastName"
                                    value={values.lastName}
                                    required
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
                                    style={{ width: "100%" }}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} md={6} xl={6}>
                                <Select
                                    label="Role"
                                    onChange={handleChange}
                                    name="role"
                                    value={values.role}
                                    options={roles}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <Select
                                    label="Gender"
                                    onChange={handleChange}
                                    name="gender"
                                    value={values.gender}
                                    options={genderOptions}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <Select
                                    label="Registered Office"
                                    onChange={handleChange}
                                    name="registeredOffice"
                                    value={values.registeredOffice}
                                    options={extractOfficeOptions(offices)}
                                />
                            </Grid>
                        </Grid>

                        <Divider />

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} xl={12}>
                                <FormControl
                                    sx={{ width: "100%" }}
                                    variant="outlined"
                                >
                                    <InputLabel htmlFor="outlined-adornment-password">
                                        Enter Password
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={"text"}
                                        value={password}
                                        onChange={handlePasswordChange}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="generate password"
                                                    edge="end"
                                                    onClick={genPassword}
                                                >
                                                    <Tooltip
                                                        title="Auto generate"
                                                        placement="left"
                                                    >
                                                        <KeyIcon />
                                                    </Tooltip>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Enter Password"
                                    />
                                </FormControl>
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

export default StaffCreate;
