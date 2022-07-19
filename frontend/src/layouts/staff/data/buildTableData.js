// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
// import MDBadge from "components/MDBadge";

import getDate from "utils/getDate";
import { Link } from "react-router-dom";

const buildTableData = (staffList) => {
    const Staff = ({ image, name, email }) => (
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

    const Role = ({ title }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography
                display="block"
                variant="caption"
                color="text"
                fontWeight="medium"
            >
                {title}
            </MDTypography>
        </MDBox>
    );

    const Phone = ({ primary, secondary }) => (
        <MDBox lineHeight={1} textAlign="left">
            <MDTypography
                display="block"
                variant="caption"
                color="text"
                fontWeight="medium"
            >
                {primary ? primary : ""}
            </MDTypography>
            <MDTypography variant="caption">
                {secondary ? secondary : ""}
            </MDTypography>
        </MDBox>
    );

    return {
        columns: [
            {
                Header: "Employee",
                accessor: "employee",
                width: "35%",
                align: "left",
            },
            { Header: "mobile", accessor: "mobile", align: "left" },
            { Header: "Role", accessor: "role", align: "left" },
            { Header: "employed Since", accessor: "employed", align: "center" },
            { Header: "action", accessor: "action", align: "center" },
        ],

        rows: staffList.map((staff) => {
            return {
                employee: (
                    <Staff
                        image={staff.image.thumbnail}
                        name={staff.name}
                        email={staff.email}
                    />
                ),
                mobile: (
                    <Phone
                        primary={staff.mobilePhoneNumber}
                        secondary={staff.homeTelephoneNumber}
                    />
                ),
                role: <Role title={staff.role} />,
                employed: (
                    <MDTypography
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {getDate(staff.createdAt)}
                    </MDTypography>
                ),
                action: (
                    <MDTypography
                        component={Link}
                        to={`/staff/${staff._id}`}
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
