// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { LinearProgress, Container } from "@mui/material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data

import buildTableData from "layouts/offices/data/buildTableData";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOfficeList } from "redux/actions/officeActions";


const OfficesTable = () => {
  const [rows, setRows] = useState([])
  const [columns, setColumns] = useState([])

  const dispatch = useDispatch()

  const {list, error, loading} = useSelector(state => state.offices)

  useEffect(() => {
    if(!list.length){
      dispatch(loadOfficeList())
    }
  }, [])

  useEffect(() => {
    if(list.length){
      const { columns, rows } = buildTableData(list);
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
                bgColor={error ? "error" :"info"}
                borderRadius="lg"
                coloredShadow={error ? "error" :"info"}
              >
                <MDTypography variant="h6" color="white">
                  Offices
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {loading ? <Container maxWidth="sm"><LinearProgress color="info"/></Container> : list.length && <DataTable
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

export default OfficesTable;
