import React, { useState } from "react";
import Modal from "components/MUIModal";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import colors from "assets/theme/base/colors";
import MDInput from "components/MDInput";
import { Grid, Container, IconButton, Divider } from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Select from "components/Select";
// formik
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateOffice } from "redux/actions/officeActions";
import axios from "axios";

const extractManagerOptions = (employees) => {
    const options = [];
    for (let employee of employees) {
        options.push({ label: employee.name, value: employee._id });
    }
    return options;
};

const OfficeEdit = ({ office, onClose, open, image, user, setImage }) => {
    const [uploadError, setUploadError] = useState(null);
    const [disableUploadBtn, setDisableUploadBtn] = useState(false);

    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.updateOffice);
    const initialValues = {
        officeName: office.officeName,
        phone: office.phone,
        street: office.address.street,
        suite: office.address.suite,
        postalCode: office.address.postalCode,
        city: office.address.city,
        manager: office.manager._id,
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];

        setDisableUploadBtn(true);
        const formdata = new FormData();
        formdata.append("image", file);
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.put(
                `/api/offices/${office._id}/upload`,
                formdata,
                config
            );
            setImage(data.banner);
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
    };

    const handleFormSubmit = (values, { setSubmitting }) => {
        const reqbody = {
            officeName: values.officeName,
            phone: values.phone,
            manager: values.manager,
            address: {
                street: values.street,
                suite: values.suite,
                postalCode: values.postalCode,
                city: values.city,
            },
        };

        dispatch(updateOffice(office._id, reqbody));
        setSubmitting(false);
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            title="Office Edit"
            description="edit office profile data"
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
                            Edit Office data
                        </MDTypography>

                        <MDBox
                            sx={{
                                display: "flex",
                                justifyContent: "left",
                            }}
                        >
                            <img
                                src={image}
                                alt="Avatar"
                                style={{ width: "300px" }}
                            />

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
                                    label="suite"
                                    onChange={handleChange}
                                    name="Suite"
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
                        <Divider />
                        <Grid container spacing={2} sx={{ marginTop: "2px" }}>
                            <Grid item xs={12} md={6} xl={6}>
                                <Select
                                    label="Assign office manager"
                                    onChange={handleChange}
                                    name="manager"
                                    value={values.manager}
                                    options={extractManagerOptions(
                                        office.employees
                                    )}
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

export default OfficeEdit;
