import * as React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
// import Projects from "layouts/dashboard/components/Projects";
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
import { useDispatch, useSelector } from "react-redux";
import MDButton from "components/MDButton";
import ExportApi from "API/ExportApi";
import { setUser } from "qpp/counterSlice";
import { incrementByAmount } from "qpp/counterSlice";
import MDSnackbar from "components/MDSnackbar";
import CircularProgress from "@mui/material/CircularProgress";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
function Dashboard() {
  const clientId = "91957916160-8q5utu0s8lh4t8vasku906vu8tuvl65f.apps.googleusercontent.com";
  const secret = "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";
  const [authToken, setAuthToken] = useState("");
  const { sales, tasks } = reportsLineChartData;
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const token = useSelector((state) => state.token)
  const [infoSB, setInfoSB] = useState(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
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
  const Dispatch =useDispatch()
  // const [successSB, setSuccessSB] = React.useState(false);
  const [errorSB, setErrorSB] = React.useState(false);
  // const openErrorSB = () => setErrorSB(true);
  // const closeErrorSB = () => setErrorSB(false);
  const formik = useFormik({
    initialValues: {
      description: "",
      tags: "",
      title: "",
      action_date: "",
      // Status: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Enter your To Do description"),
      action_date: Yup.string().required("Please select your work day"),
      title: Yup.string().required("Enter your To Do Title"),
      tags: Yup.string().required("Please select your To Do Tag"),
      // Status: Yup.string().required("Please select your  Status"),
    }),
    onSubmit: (values,{ resetForm }) => {
      setLoader(true);
      ExportApi.CreatedToDo(values,token)
        .then((resp) => {
          setLoader(false);
          if (resp.data) {
            console.log(resp.data)
            if (resp.data.status == "Token is Expired") {
              Dispatch(setUser("{}"));
              Dispatch(incrementByAmount(""));
          }
            if (resp.data.message == "Todo added successfully") {
               resetForm() 
               openInfoSB()
               setInfoSB(true)
               handleClose()
        }
          
          }
        })
        .catch((err) => {
          setLoader(false);
          console.log(err)
        });
    },
  });

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log({codeResponse});
      setAuthToken(codeResponse.code);
    },
    flow: "auth-code",
  });

  const getToken = async () => {
    const params = new URLSearchParams();
    params.append("code", authToken);
    params.append("client_id", clientId);
    params.append("client_secret", secret);
    params.append("redirect_uri", "http://localhost:3000");
    params.append("grant_type", "authorization_code");

    try {
      const response = await axios.post("https://oauth2.googleapis.com/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      console.log("response getToken", response.data);
    } catch (error) {
      console.error("error", error.response.data);
    }
  };

  React.useEffect(() => {
    if (authToken) {
      getToken();
    }
  }, [authToken]);
  const renderInfoSB = (
    <MDSnackbar
      bgWhite
      title="To do created successfully"
      content=""
      color="success"
      icon="check"
      dateTime=""
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );
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
                icon="add"
                title="Create To Do"
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
              onClick={login}
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
              {/* <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Followers"
                count="+91"
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              /> */}
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
          {/* <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid> */}
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
            Your today plan list
          </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <Grid item xs={12} md={6} lg={4}>
                <OrdersOverview />
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Close</Button>
            {/* <Button onClick={handleClose1} autoFocus>
              Done
            </Button> */}
          </DialogActions>
        </Dialog>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle className="min-w-96" id="alert-dialog-title">
            What is your plan today?
          </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
              <form onSubmit={formik.handleSubmit}>
                <MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      type="text"
                      name="title"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.title}
                      label="Title"
                      fullWidth
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.title}</div>
                    ) : null}
                  </MDBox>
                  <MDBox mb={2}>
                    <MDInput
                      name="action_date"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.action_date || null}
                      type="date"
                      label="Work Day"
                      fullWidth
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    {formik.touched.action_date && formik.errors.action_date ? (
                      <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.action_date}</div>
                    ) : null}
                  </MDBox>

                  <MDBox mb={2}>
                    <MDInput
                      type="textarea"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      name="description"
                      label="Description"
                      multiline
                      rows={4}
                      fullWidth
                    />
                    {formik.touched.description && formik.errors.description ? (
                      <div style={{ color: "red", fontSize: "15px" }}>
                        {formik.errors.description}
                      </div>
                    ) : null}
                  </MDBox>
                  <MDBox mb={2}>
                    <FormControl  fullWidth>
                      <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                      <Select
                      sx={{height:45 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.tags}
                        name={"tags"}
                        label="Tag"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={"daily routine"}>Daily routine</MenuItem>
                        <MenuItem value={"wedding"}>Wedding</MenuItem>
                        <MenuItem value={"shoping"}>Shoping</MenuItem>
                      </Select>
                    </FormControl>
                    {formik.touched.tags && formik.errors.tags ? (
                      <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.tags}</div>
                    ) : null}
                  </MDBox>
                  {/* <MDBox mb={2}>
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
                  </MDBox> */}
                </MDBox>
              <div class="flex justify-between items-center">
                <div><MDButton type="submit" color="primary" variant="contained" size="small">{loader ? <CircularProgress size={20}/>  : "Create To Do" }</MDButton></div>  
                <div><MDButton onClick={handleClose} color="primary" variant="contained" size="small">Cancel</MDButton></div>
              </div>
              {/* <Button type="submit" onClick={formik.handleSubmit} autoFocus>
                Create TODO
              </Button> */}
          </form>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
      </React.Fragment>
      {renderInfoSB}
    </DashboardLayout>
  );
}

export default Dashboard;
