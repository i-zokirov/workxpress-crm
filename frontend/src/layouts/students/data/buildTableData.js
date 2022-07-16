// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import { Link } from "react-router-dom";

import getDateAndTime from "utils/getDateAndTime";

const buildTableData = (studentsList) => {
    const assignColor = (status) => {
        switch (status) {
            case "Student":
                return "info";
            case "New Applicant":
                return "success";
            case "Alumni":
                return "warning";
            case "Graduated":
                return "primary";
            case "Drop-out":
                return "dark";
        }
    };

    const Student = ({ image, name, email }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={image} name={name} size="sm" />
            <MDBox ml={2} lineHeight={1}>
                <MDTypography
                    display="block"
                    variant="button"
                    fontWeight="medium"
                >
                    {name}
                </MDTypography>
                <MDTypography variant="caption">{email}</MDTypography>
            </MDBox>
        </MDBox>
    );

    const Creator = ({ name, role }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography
                display="block"
                variant="caption"
                color="text"
                fontWeight="medium"
            >
                {name}
            </MDTypography>
            <MDTypography variant="caption">{role ? role : ""}</MDTypography>
        </MDBox>
    );

    return {
        columns: [
            {
                Header: "Student",
                accessor: "student",
                width: "35%",
                align: "left",
            },
            { Header: "mobile", accessor: "mobile", align: "left" },
            {
                Header: "registered by",
                accessor: "registeredby",
                align: "left",
            },
            {
                Header: "Registered branch",
                accessor: "registeredBranch",
                align: "left",
            },
            { Header: "status", accessor: "status", align: "center" },
            { Header: "registered", accessor: "registered", align: "center" },
            { Header: "age", accessor: "age", align: "center" },

            { Header: "action", accessor: "action", align: "center" },
        ],

        rows: studentsList.map((student) => {
            return {
                student: (
                    <Student
                        image={student.image.thumbnail}
                        name={student.name}
                        email={student.email}
                    />
                ),
                mobile: (
                    <MDTypography
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {student.mobilePhoneNumber}
                    </MDTypography>
                ),
                registeredby: (
                    <Creator
                        name={student.createdBy.name}
                        role={student.createdBy.role}
                    />
                ),
                status: (
                    <MDBox ml={-1}>
                        <MDBadge
                            badgeContent={student.status}
                            color={assignColor(student.status)}
                            variant="gradient"
                            size="sm"
                        />
                    </MDBox>
                ),
                registered: (
                    <MDTypography
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {getDateAndTime(student.createdAt)}
                    </MDTypography>
                ),
                age: (
                    <MDTypography
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {new Date().getFullYear() -
                            student.birthdate.split("-")[0]}
                    </MDTypography>
                ),
                registeredBranch: (
                    <MDTypography
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {student.branch ? student.branch.officeName : "Not set"}
                    </MDTypography>
                ),
                action: (
                    <MDTypography
                        component={Link}
                        to={`/students/${student._id}`}
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        View
                    </MDTypography>
                ),
            };
        }),
    };
};

export default buildTableData;
