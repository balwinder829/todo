import * as React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import MDInput from "components/MDInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
function Dashboard() {
  const { sales, tasks } = reportsLineChartData;
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [successSB, setSuccessSB] = React.useState(false);
  const [errorSB, setErrorSB] = React.useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const formik = useFormik({
    initialValues: {
      Description: "",
      Tag: "",
      Titel: "",
      WorkDay: "",
      module: "",
      Status: "",
    },
    validationSchema: Yup.object({
      Description: Yup.string().required("Enter your description"),
      WorkDay: Yup.string().required("Please select your work day"),
      Titel: Yup.string().required("Enter your To Do Titel"),
      Tag: Yup.string().required("Please select your  Tag"),
      Status: Yup.string().required("Please select your  Status"),
    }),
    onSubmit: (values) => {
      // ExportApi.Register(values.email, values.Description, values.Titel,values.WorkDay,values.mobile)
      //   .then((resp) => {
      //     if (resp.data) {
      //       console.log(resp.data)
      //       // if (resp.data.code == 200) {
      //       //   localStorage.removeItem('showPage')
      //       //   toast.success(resp.data.message, {
      //       //     position: "top-right",
      //       //     autoClose: 5000,
      //       //     hideProgressBar: false,
      //       //     closeOnClick: true,
      //       //     pauseOnHover: true,
      //       //     draggable: true,
      //       //     progress: undefined,
      //       //     });
      //       // } else {
      //       //   toast.error(resp.data.message, {
      //       //     position: "top-right",
      //       //     autoClose: 5000,
      //       //     hideProgressBar: false,
      //       //     closeOnClick: true,
      //       //     pauseOnHover: true,
      //       //     draggable: true,
      //       //     progress: undefined,
      //       //     });
      //       // }
      //     }
      //   })
      //   .catch((err) => console.log(err));
    },
  });
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                onClick={handleClickOpen}
                color="dark"
                icon="weekend"
                title="create ToDo"
                count={"To Do"}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                onClick={handleClickOpen1}
                title="Today's Work"
                count="30"
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="All Work List"
                count="34k"
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      {/* <Footer /> */}
      <React.Fragment>
        <Dialog
          open={open1}
          onClose={handleClose1}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="min-w-96" id="alert-dialog-title">
            {" Your today plan list"}
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid item xs={12} md={6} lg={4}>
                <OrdersOverview />
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Disagree</Button>
            <Button onClick={handleClose1} autoFocus>
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="min-w-96" id="alert-dialog-title">
            {"what is your plan today ?"}
          </DialogTitle>
          <form className="p-3" onSubmit={formik.handleSubmit}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      name="Titel"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Titel}
                      label="Titel"
                      fullWidth
                    />
                    {formik.touched.Titel && formik.errors.Titel ? (
                      <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.Titel}</div>
                    ) : null}
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      name="WorkDay"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.WorkDay}
                      plaseholder="kk"
                      type="date"
                      label="Work Day"
                      fullWidth
                    />
                    {formik.touched.WorkDay && formik.errors.WorkDay ? (
                      <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.WorkDay}</div>
                    ) : null}
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="textarea"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Description}
                      name="Description"
                      label="Description"
                      fullWidth
                    />
                    {formik.touched.Description && formik.errors.Description ? (
                      <div style={{ color: "red", fontSize: "15px" }}>
                        {formik.errors.Description}
                      </div>
                    ) : null}
                  </MDBox>
                  <MDBox mb={2}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
                      <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                      <Select
                      sx={{height:45 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Tag}
                        label="Tag"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"created"}>created </MenuItem>
                        <MenuItem value={"Padding"}>Padding</MenuItem>
                        <MenuItem value={"daily routine"}>padding</MenuItem>
                        <MenuItem value={"wedding"}>Wedding</MenuItem>
                        <MenuItem value={"shoping"}>Shoping</MenuItem>
                      </Select>
                    </FormControl>
                    {formik.touched.Tag && formik.errors.Tag ? (
                      <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.Tag}</div>
                    ) : null}
                  </MDBox>
                  <MDBox mb={2}>
                    <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                      <Select
                       sx={{height:45 }}
                       labelId="demo-simple-select-label"
                       id="demo-simple-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Status}
                        label="Status"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"created"}>Created </MenuItem>
                        <MenuItem value={"padding"}>Padding</MenuItem>
                        <MenuItem value={"Ssuccess"}>Ssuccess</MenuItem>
                      </Select>
                    </FormControl>
                    {formik.touched.Status && formik.errors.Status ? (
                      <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.Status}</div>
                    ) : null}
                  </MDBox>
                </MDBox>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cansel</Button>
              <Button type="submit" autoFocus>
                Create TODO
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </React.Fragment>
    </DashboardLayout>
  );
}

export default Dashboard;
