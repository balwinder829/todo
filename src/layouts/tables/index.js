 

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

import NewTable from "./NewTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "qpp/counterSlice";
import { incrementByAmount } from "qpp/counterSlice";
import ExportApi from "API/ExportApi";
import DndNew from "./DndNew";
import LastDnd from "./lastDnd";
import App from "./lastDnd";

function Tables() {
const [Data, setData] = useState([])
const [page, setpage] = useState(1)
const token = useSelector((state) => state.token)
const Dispatch =useDispatch()
const getData =(values)=>{
  ExportApi.getData(values,token)
  .then((resp) => {
    if (resp.data) {
      console.log(resp.data)
      if (resp.data.status == "Token is Expired") {
        Dispatch(setUser("{}"));
        Dispatch(incrementByAmount(""));
    }else{
      setData(resp.data)
    }
    }
  })
  .catch((err) => console.log(err));
}

useEffect(() => {
  getData(1)
}, [])

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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                Todo list
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {/* <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                /> */}
                {/* {Data&&
                <DndNew getpage={getData} data={Data}/>} */}
                {Data&&
                <App getpage={getData} data={Data}/>}
                {/* <NewTable getpage={getData} data={Data} /> */}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
