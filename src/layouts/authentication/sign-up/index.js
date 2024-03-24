import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import ExportApi from "API/ExportApi";
import logo from "assets/images/logo.jpg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
function Cover() {
  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Please enter valid email address").required("Enter your email"),
      password: Yup.string().required("Enter your password"),
      mobile: Yup.number().required("Enter your mobile number"),
      last_name: Yup.string().required("Enter your last name"),
      first_name: Yup.string().required("Enter your first name"),
    }),
    onSubmit: (values) => {
      ExportApi.Register(values.email, values.password, values.first_name,values.last_name,values.mobile)
        .then((resp) => {
          if (resp.data) {
            console.log(resp.data)
            // if (resp.data.code == 200) {
            //   localStorage.removeItem('showPage')
            //   toast.success(resp.data.message, {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     });
            // } else {
            //   toast.error(resp.data.message, {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     });
            // }
          }
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <CoverLayout image={bgImage}>
      <Card>
        {/* <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox> */}
         <div className="flex items-center justify-center ">
          <img className="rounded p-4" style={{borderRadius:"45%",width:"150px"}} src={logo}/>
        </div>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={formik.handleSubmit}>
            <MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="text"
                  name="first_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                  label="First Name"
                  variant="standard"
                  fullWidth
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div style={{ color: "red",fontSize:"15px" }}>{formik.errors.first_name}</div>
                ) : null}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  name="last_name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                  type="text"
                  label="Last Name"
                  variant="standard"
                  fullWidth
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div style={{ color: "red",fontSize:"15px" }}>{formik.errors.last_name}</div>
                ) : null}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="number"
                  name="mobile"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobile}
                  label="Mobile Number"
                  variant="standard"
                  fullWidth
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div style={{ color: "red",fontSize:"15px" }}>{formik.errors.mobile}</div>
                ) : null}
              </MDBox>
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
                  <div style={{ color: "red",fontSize:"15px" }}>{formik.errors.email}</div>
                ) : null}
              </MDBox>
              <MDBox mb={2}>
                <MDInput
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  name="password"
                  label="Password"
                  fullWidth
                />
                {formik.touched.password && formik.errors.password ? (
                  <div style={{ color: "red",fontSize:"15px" }}>{formik.errors.password}</div>
                ) : null}
              </MDBox>
              {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox> */}
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" type="submit" fullWidth>
                  sign in
                </MDButton>
              </MDBox>
              <MDBox mt={3} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
