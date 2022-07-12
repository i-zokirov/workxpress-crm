import React, { useState } from "react";
import Modal from "components/MUIModal";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import { Grid, Container, Divider } from "@mui/material";
import MDButton from "components/MDButton";
import Select from "components/Select";
// formik
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { createStudentProfile } from "redux/actions/studentActions";

import MultipleSelect from "components/MultiSelect";

const statuses = [
    {
        label: "Student",
        value: "Student",
    },
    {
        label: "New Applicant",
        value: "New Applicant",
    },
    {
        label: "Alumni",
        value: "Alumni",
    },
    {
        label: "Graduated",
        value: "Graduated",
    },
    {
        label: "Drop-out",
        value: "Drop-out",
    },
];

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

const extractClassOptions = (classes) => {
    const options = [];
    for (let cls of classes) {
        options.push(cls._id);
    }
    return options;
};

const extractOfficeOptions = (offices) => {
    const options = [];
    for (let office of offices) {
        options.push({ label: office.officeName, value: office._id });
    }
    return options;
};

const initialValues = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    birthdate: "",
    status: "New Applicant",
    mobilePhoneNumber: "",
    homeTelephoneNumber: "",
    street: "",
    suite: "",
    postalCode: "",
    city: "",
    branch: "",
};

const ProfileCreate = ({ open, onClose, classOptions, officeOptions }) => {
    const [enrolledClasses, setEnrolledClasses] = useState(
        extractClassOptions([])
    );

    const handleClassChange = (event) => {
        const {
            target: { value },
        } = event;
        setEnrolledClasses(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const { loading } = useSelector((state) => state.updateProfile);

    const dispatch = useDispatch();

    const user = useSelector((state) => state.auth.userData);

    const handleFormSubmit = (values, { setSubmitting }) => {
        const reqBody = {
            name: `${values.firstName} ${values.lastName}`,
            email: values.email,
            birthdate: values.birthdate,
            gender: values.gender,
            mobilePhoneNumber: values.mobilePhoneNumber,
            homeTelephoneNumber: values.homeTelephoneNumber,
            address: {
                street: values.street,
                suite: values.suite,
                postalCode: values.postalCode,
                city: values.city,
            },
            status: values.status,
            enrolledClasses,
            createdBy: user._id,
        };
        dispatch(createStudentProfile(reqBody));
        setSubmitting(false);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Create Student"
            description="Create new Student record"
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
                            Create new Student
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
                                    label="First Name"
                                    onChange={handleChange}
                                    name="firstName"
                                    value={values.firstName}
                                    required
                                    style={{
                                        width: "100%",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={6}>
                                <MDInput
                                    type="text"
                                    label="Last Name"
                                    onChange={handleChange}
                                    name="lastName"
                                    value={values.lastName}
                                    required
                                    style={{
                                        width: "100%",
                                    }}
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
                                    label="Status"
                                    onChange={handleChange}
                                    name="status"
                                    value={values.status}
                                    options={statuses}
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
                        </Grid>

                        <Divider />

                        <Grid container spacing={2} sx={{ marginTop: "2px" }}>
                            <Grid item xs={12} md={12} xl={12}>
                                <Select
                                    label="Registered Branch"
                                    onChange={handleChange}
                                    name="branch"
                                    value={values.branch}
                                    options={extractOfficeOptions(
                                        officeOptions
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={12} xl={12}>
                                <MultipleSelect
                                    options={extractClassOptions(classOptions)}
                                    handleChange={handleClassChange}
                                    selected={enrolledClasses}
                                    label="Enroll to Classes"
                                    originalList={classOptions}
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

export default ProfileCreate;
