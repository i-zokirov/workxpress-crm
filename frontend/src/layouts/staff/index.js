// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import buildTableDate from "layouts/staff/data/buildTableData";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadStaffList } from "redux/actions/staffActions";
import { Container, LinearProgress } from "@mui/material";

const  Staff = () => {
  
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if(!list.length){
      dispatch(loadStaffList())
    }
  }, [])


  const {list, error, loading} = useSelector(state => state.staff)

  useEffect(() => {
    if(list.length){
      const { columns, rows } = buildTableDate(list);
      setRows(rows)
      setColumns(columns)
    }
  }, [list])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor={error ? "error" : "info"}
                borderRadius="lg"
                coloredShadow={error ? "error" : "info"}
              >
                <MDTypography variant="h6" color="white">
                  Staff/Employees { error && `: ${error}`}
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
               {loading ? <Container maxWidth="sm"><LinearProgress color="info"/></Container> : list.length &&  <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />}
              </MDBox>
            </Card>
          </Grid>
          
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Staff;
