import { useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// import Grid from "@mui/material/Grid";
// import MuiLink from "@mui/material/Link";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import GitHubIcon from "@mui/icons-material/GitHub";
// import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import logo from "assets/images/logo.jpg";
import ExportApi from "API/ExportApi";
import { useFormik } from "formik";
import CircularProgress from '@mui/material/CircularProgress';
import * as Yup from "yup";
import MDSnackbar from "components/MDSnackbar";
import { useDispatch } from "react-redux";
import { setUser } from "qpp/counterSlice";
import { incrementByAmount } from "qpp/counterSlice";
function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [successSB, setSuccessSB] = useState(false);
  const [loader, setLoader] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const Dispatch =useDispatch()
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Please enter valid email address").required("Enter your email"),
      password: Yup.string().required("Enter your password"),
    }),
    onSubmit: (values) => {
      setLoader(true);
      ExportApi.UserLogin(values.email,values.password)
        .then((resp) => {
          setLoader(false);
          if (resp.data) {
            if (resp.data.success == false) {
              setErrorSB(true)
            } else {
              console.log(resp.data.data.user)
              Dispatch(setUser(JSON.stringify(resp.data.data.user)))
              Dispatch(incrementByAmount(resp.data.data.token))
            }
          }
        })
        .catch((err) => {
          console.log(err)
          setLoader(false);
        });
    },
  });
  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Login credentials are invalid"
      content="Login credentials are invalid"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );
  return (
    <BasicLayout image={bgImage}>
      <Card>
        {/* <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox> */}
        {/* <p className="p-4">bablu</p> */}
        <div className="flex items-center justify-center ">
          <img className="rounded p-4" style={{borderRadius:"45%",width:"150px"}} src={logo}/>
        </div>
        <MDBox pt={4} pb={3} px={3}>
        <form onSubmit={formik.handleSubmit}>
          <MDBox >
            <MDBox mb={2}>
              <MDInput
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                type="email"
                label="Email"
                fullWidth
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: "red" ,fontSize:"15px"}}>{formik.errors.email}</div>
              ) : null}
              {/* <p style={{ color: "red" }}> {err ? err : null}</p> */}
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password"  onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                name="password"
                label="Password" fullWidth />
                 {formik.touched.password && formik.errors.password ? (
                <div style={{ color: "red",fontSize:"15px" }}>{formik.errors.password}</div>
              ) : null}
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton disabled={loader} type="submit" variant="gradient" color="info" fullWidth>
                {loader ? <CircularProgress size={20}/>  : "Sign in" }
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
          </form>
        </MDBox>
      </Card>
      {renderErrorSB}
    </BasicLayout>
  );
}

export default Basic;
