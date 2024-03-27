import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";

import * as React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import MDInput from "components/MDInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import MDButton from "components/MDButton";
import ExportApi from "API/ExportApi";
import { setUser } from "qpp/counterSlice";
import { incrementByAmount } from "qpp/counterSlice";
import MDSnackbar from "components/MDSnackbar";
function CreateToDo() {
  const token = useSelector((state) => state.token);
  const [infoSB, setInfoSB] = useState(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);

  const Dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      description: "",
      tags: "",
      title: "",
      action_date: "",
      // Status: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Enter your description"),
      action_date: Yup.string().required("Please select your work day"),
      title: Yup.string().required("Enter your To Do Title"),
      tags: Yup.string().required("Please select your  Tag"),
      // Status: Yup.string().required("Please select your  Status"),
    }),
    onSubmit: (values, { resetForm }) => {
      ExportApi.CreatedToDo(values, token)
        .then((resp) => {
          if (resp.data) {
            console.log(resp.data);
            if (resp.data.status == "Token is Expired") {
              Dispatch(setUser("{}"));
              Dispatch(incrementByAmount(""));
            }
            if (resp.data.message == "Todo added successfully") {
              resetForm();
              openInfoSB();
              setInfoSB(true);
            }
          }
        })
        .catch((err) => console.log(err));
    },
  });
  const renderInfoSB = (
    <MDSnackbar
      bgWhite
      title="Todo added successfully"
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
                  Create To Do
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <form className="flex justify-center" onSubmit={formik.handleSubmit}>
                  <MDBox className="w-1/3 bg-gray-200 p-4 shadow-lg">
                    <h2 style={{marginBlock:"20px"}}>what is your plan today ?</h2>
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
                        value={formik.values.action_date}
                        plaseholder="kk"
                        type="date"
                        label="Work Day"
                        fullWidth
                      />
                      {formik.touched.action_date && formik.errors.action_date ? (
                        <div style={{ color: "red", fontSize: "15px" }}>
                          {formik.errors.action_date}
                        </div>
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
                        row={5}
                        fullWidth
                      />
                      {formik.touched.description && formik.errors.description ? (
                        <div style={{ color: "red", fontSize: "15px" }}>
                          {formik.errors.description}
                        </div>
                      ) : null}
                    </MDBox>
                    <MDBox mb={2}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                        <Select
                          sx={{ height: 45 }}
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
                  <MDButton type="submit">Create TODO</MDButton>
                  </MDBox>
                  {/* <Button onClick={handleClose}>Cancel</Button> */}
                  {/* <Button type="submit" onClick={formik.handleSubmit} autoFocus>
                Create TODO
              </Button> */}
                </form>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      {renderInfoSB}
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default CreateToDo;
