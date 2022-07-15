import React, { useState } from "react";
import Modal from "components/MUIModal";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDInput from "components/MDInput";
import {
    Grid,
    Container,
    Divider,
    Button,
    Icon,
    IconButton,
} from "@mui/material";
import MDButton from "components/MDButton";
import Select from "components/Select";
// formik
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentProfile } from "redux/actions/studentActions";
import { deleteStudentProfile } from "redux/actions/studentActions";
import MultipleSelect from "components/MultiSelect";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
// Material Dashboard 2 React contexts
import { useMaterialUIController } from "context";

import axios from "axios";
import baseUrl from "baseUrl";
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

const extractOfficeOptions = (offices) => {
    const options = [];
    for (let office of offices) {
        options.push({ label: office.officeName, value: office._id });
    }
    return options;
};

const extractClassOptions = (classes) => {
    const options = [];
    for (let cls of classes) {
        options.push(cls._id);
    }
    return options;
};

const ProfileEdit = ({
    open,
    onClose,
    student,
    classOptions,
    officeOptions,
}) => {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const [openNestedModal, setOpenNestedModal] = useState(false);
    const [enrolledClasses, setEnrolledClasses] = useState(
        extractClassOptions(student.enrolledClasses)
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
    const handleNestedModalChange = () => {
        setOpenNestedModal((prev) => !prev);
    };
    const initialValues = {
        name: student.name,
        email: student.email,
        birthdate: student.birthdate,
        status: student.status,
        mobilePhoneNumber: student.mobilePhoneNumber
            ? student.mobilePhoneNumber
            : "",
        homeTelephoneNumber: student.homeTelephoneNumber
            ? student.homeTelephoneNumber
            : "",
        street: student.address ? student.address.street : "",
        suite: student.address ? student.address.suite : "",
        postalCode: student.address ? student.address.postalCode : "",
        city: student.address ? student.address.city : "",
        branch: student.branch ? student.branch._id : "",
    };

    const dispatch = useDispatch();

    const handleFormSubmit = (values, { setSubmitting }) => {
        const reqBody = {
            birthdate: values.birthdate,
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
            branch: values.branch,
        };
        dispatch(updateStudentProfile(reqBody, student._id));
        setSubmitting(false);
        onClose();
    };

    const handleDeleteStudentProfile = () => {
        dispatch(deleteStudentProfile(student._id));
    };

    const { loading } = useSelector((state) => state.updateProfile);

    const user = useSelector((state) => state.auth.userData);

    const [disableUploadBtn, setDisableUploadBtn] = useState(false);
    const [image, setImage] = useState(student.image.circle || "");
    const handleUpload = async (e) => {
        const file = e.target.files[0];

        const formdata = new FormData();
        formdata.append("image", file);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            await axios.post(
                `/api/students/${student._id}/upload`,
                formdata,
                config
            );
        } catch (error) {
            console.log(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    };
    return (
        <Modal
            open={open}
            onClose={onClose}
            title="profile-edit"
            description="edit profile data"
        >
            <Modal
                open={openNestedModal}
                onClose={handleNestedModalChange}
                title="HEADS-UP!"
                description="confirm action"
            >
                <MDBox>
                    <MDTypography>
                        Are you sure you would like to delete this student
                        account ?
                    </MDTypography>
                    <MDTypography>
                        Note: You will not be able to recover this data!
                    </MDTypography>
                </MDBox>
                <MDBox
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
                            onClick={handleDeleteStudentProfile}
                        >
                            Yes
                        </MDButton>
                    </MDBox>
                    <MDBox>
                        <MDButton
                            variant="gradient"
                            color="secondary"
                            size="medium"
                            onClick={handleNestedModalChange}
                        >
                            No
                        </MDButton>
                    </MDBox>
                </MDBox>
            </Modal>
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
                            <MDAvatar
                                src="https://bit.ly/34BY10g"
                                alt="Avatar"
                                size="xxl"
                            />
                            <MDBox>
                                <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="label"
                                    size="large"
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
                                    style={{
                                        width: "100%",
                                        bgColor: "transparent",
                                    }}
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
                                    label="Status"
                                    onChange={handleChange}
                                    name="status"
                                    value={values.status}
                                    options={statuses}
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
                                    label="Enrolled Classes"
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
                            {user.role === "Administrator" && (
                                <MDBox sx={{ paddingRight: "5px" }}>
                                    <MDButton
                                        variant="gradient"
                                        color="warning"
                                        size="medium"
                                        disabled={loading}
                                        onClick={handleNestedModalChange}
                                    >
                                        Delete
                                    </MDButton>
                                </MDBox>
                            )}
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
