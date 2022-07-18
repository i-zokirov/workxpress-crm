// @mui material components
import BusinessIcon from "@mui/icons-material/Business";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import team2 from "assets/images/team-2.jpg";
import { Link } from "react-router-dom";
const buildOfficeTableData = (officeList) => {
    const Manager = ({ manager }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar
                src={team2}
                name={manager ? manager.name : ""}
                size="sm"
            />
            <MDBox ml={2} lineHeight={1}>
                <MDTypography
                    component={Link}
                    to={`/staff/${manager._id}`}
                    display="block"
                    variant="button"
                    fontWeight="medium"
                >
                    {manager ? manager.name : ""}
                </MDTypography>
                <MDTypography variant="caption">
                    {manager ? manager.mobilePhoneNumber : ""}
                </MDTypography>
            </MDBox>
        </MDBox>
    );
    const Address = ({ address }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDBox ml={2} lineHeight={1}>
                <MDTypography
                    display="block"
                    variant="button"
                    fontWeight="medium"
                >
                    {address.street} {address.suite}
                </MDTypography>
                <MDTypography variant="caption">
                    {address.postalCode}, {address.City}
                </MDTypography>
            </MDBox>
        </MDBox>
    );

    const Office = ({ name }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <BusinessIcon size="sm" variant="rounded" />
            <MDTypography
                display="block"
                variant="button"
                fontWeight="medium"
                ml={1}
                lineHeight={1}
            >
                {name}
            </MDTypography>
        </MDBox>
    );

    return {
        columns: [
            {
                Header: "office name",
                accessor: "officename",
                width: "30%",
                align: "left",
            },
            {
                Header: "office Address",
                accessor: "officeAddress",
                align: "left",
            },
            { Header: "Telephone", accessor: "telephone", align: "left" },
            { Header: "office manager", accessor: "manager", align: "left" },
            { Header: "employees", accessor: "employees", align: "center" },
            { Header: "students", accessor: "students", align: "center" },
            { Header: "action", accessor: "action", align: "center" },
        ],

        rows: officeList.map((office) => {
            return {
                officename: <Office name={office.officeName} />,
                officeAddress: <Address address={office.address} />,
                telephone: (
                    <MDTypography
                        variant="caption"
                        color="text"
                        fontWeight="medium"
                    >
                        {office.phone}
                    </MDTypography>
                ),
                manager: <Manager manager={office.manager} />,
                employees: (
                    <MDTypography variant="caption" color="text">
                        {office.employees.length}
                    </MDTypography>
                ),
                students: (
                    <MDTypography variant="caption" color="text">
                        {office.students.length}
                    </MDTypography>
                ),
                action: (
                    <MDTypography
                        component={Link}
                        to={`/offices/${office._id}`}
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

export default buildOfficeTableData;
