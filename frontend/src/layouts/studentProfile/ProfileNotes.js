import React from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Formik } from "formik";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { useDispatch, useSelector } from "react-redux";
import { updateStudentProfile } from "redux/actions/studentActions";
import getDateAndTime from "utils/getDateAndTime";

const handleSort = (a, b) => {
    return a.createdAt - b.createdAt;
};
const ProfileNotes = ({ title, info, action, shadow, student }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.userData);
    const handleSubmit = (values, { setSubmitting }) => {
        const reqBody = {
            update: {
                body: values.body,
                updatedBy: user._id,
            },
        };
        setSubmitting();
        dispatch(updateStudentProfile(reqBody, student._id));
    };
    const updates = student.updateHistory.sort(handleSort);
    return (
        <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
            <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                px={2}
            >
                <MDTypography
                    variant="h6"
                    fontWeight="medium"
                    textTransform="capitalize"
                >
                    {title}
                </MDTypography>
            </MDBox>
            <MDBox p={2}>
                <MDBox opacity={0.3}>
                    <Divider />
                </MDBox>
                <MDBox>
                    <Formik
                        initialValues={{ body: "" }}
                        onSubmit={handleSubmit}
                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit}>
                                <MDBox>
                                    <MDInput
                                        label="Leave a note here..."
                                        multiline
                                        value={values.body}
                                        onChange={handleChange}
                                        name="body"
                                        rows={4}
                                        sx={{ width: "100%" }}
                                    />
                                </MDBox>
                                <MDBox
                                    sx={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        paddingTop: "5px",
                                    }}
                                >
                                    <MDButton
                                        variant="gradient"
                                        color="info"
                                        size="small"
                                        type="submit"
                                    >
                                        Save
                                    </MDButton>
                                </MDBox>
                            </form>
                        )}
                    </Formik>
                </MDBox>
            </MDBox>
            <MDBox p={2}>
                <MDBox opacity={0.3}>
                    <Divider />
                </MDBox>
                <MDBox>
                    {updates.map((update) => (
                        <Card
                            sx={{
                                minHeight: "40px",
                                width: "100%",
                                boxShadow: "",
                                padding: "15px",
                                marginTop: "15px",
                                marginBottom: "15px",
                            }}
                            key={update._id}
                        >
                            <MDBox
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <MDTypography variant="caption">
                                    {update.updatedBy.name}
                                </MDTypography>
                                <MDTypography variant="caption">
                                    {getDateAndTime(update.createdAt)}
                                </MDTypography>
                            </MDBox>
                            <Divider />
                            <MDBox>
                                <MDTypography
                                    variant="button"
                                    fontWeight="regular"
                                    color="text"
                                >
                                    {update.body}
                                </MDTypography>
                            </MDBox>
                        </Card>
                    ))}
                </MDBox>
            </MDBox>
        </Card>
    );
};

export default ProfileNotes;
