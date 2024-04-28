import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import MDInput from "components/MDInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import { BsBuildingAdd } from "react-icons/bs";
// import * as React from 'react';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MDButton from "components/MDButton";
// import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Settings(props) {
  const [Labels, setLabels] = useState([]);
  const [Label, setLabel] = useState("");
  const [loader, setloader] = useState(false);
  const formik = useFormik({
    initialValues: {
      description: "",
      frequency: "daily",
      title: "",
      action_date: "",
      perday: "5",
      // Status: "",
    },
    validationSchema: Yup.object({
      //   description: Yup.string().required("Enter your To Do description"),
      //   action_date: Yup.string().required("Please select your work day"),
      //   title: Yup.string().required("Enter your To Do Title"),
      //   frequency: Yup.string().required("Please select your To Do Tag"),
      // Status: Yup.string().required("Please select your  Status"),
    }),
    onSubmit: (values, { resetForm }) => {
      //   setLoader(true);
      //   ExportApi.CreatedToDo(values, token)
      //     .then((resp) => {
      //       setLoader(false);
      //       if (resp.data) {
      //         console.log(resp.data);
      //         if (resp.data.status == "Token is Expired") {
      //           Dispatch(setUser("{}"));
      //           Dispatch(incrementByAmount(""));
      //         }
      //         if (resp.data.message == "Todo added successfully") {
      //           resetForm();
      //           openInfoSB();
      //           setInfoSB(true);
      //           handleClose();
      //         }
      //       }
      //     })
      //     .catch((err) => {
      //       setLoader(false);
      //       console.log(err);
      //     });
    },
  });
  const addLabels = () => {
    if (Label) {
      Labels.push({ tagName: Label });
      setLabel("");
    }
  };
  const DeletLabels = (i) => {
      Labels.splice(i,1)
setLabels([...Labels])
    
  };
  return (
    <div>
      {" "}
      <form onSubmit={formik.handleSubmit}>
        <MDBox>
          <MDBox mb={2}>
            <MDInput
              //   type="textarea"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.projectName}
              name="projectName"
              label="Project Name"
              //   multiline
              //   rows={4}
              fullWidth
            />
            {formik.touched.projectName && formik.errors.projectName ? (
              <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.projectName}</div>
            ) : null}
          </MDBox>
          <Grid container sx={{ marginBottom: "15px" }} spacing={2}>
            <Grid item xs={8}>
              <Item>
                <MDInput
                  value={Label}
                  onChange={(e) => setLabel(e.target.value)}
                  label="Label"
                  fullWidth
                />
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>
                <div
                  onClick={() => addLabels()}
                  style={{
                    color: "green",
                    display: "flex",
                    fontSize: "20px",
                    textAlign: "center",
                    paddingTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ paddingTop: "10px" }}>
                    {" "}
                    <BsBuildingAdd />
                  </span>
                  <span style={{ paddingLeft: "10px" }}>Add</span>
                </div>
              </Item>
            </Grid>
          </Grid>
          <MDBox mb={2}>
            {Labels.map((val, i) => {
              return (
                <span
                  id="badge-dismiss-default"
                  class="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {val.tagName}
                  <button
                  onClick={()=>DeletLabels(i)}
                    type="button"
                    class="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                    data-dismiss-target="#badge-dismiss-default"
                    aria-label="Remove"
                  >
                    <svg
                      class="w-2 h-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span class="sr-only">Remove badge</span>
                  </button>
                </span>
              );
            })}
          </MDBox>
          <MDBox mb={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Frequency of emails</InputLabel>
              <Select
                sx={{ height: 45 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.frequency}
                name={"frequency"}
                label="Frequency of emails "
              >
                {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
                <MenuItem value={"daily"}>Daily</MenuItem>
                <MenuItem value={"2 Day"}>2 Day</MenuItem>
                <MenuItem value={"5 Day"}>5 Day</MenuItem>
                <MenuItem value={"Weekly"}>Weekly</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.frequency && formik.errors.frequency ? (
              <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.frequency}</div>
            ) : null}
          </MDBox>
          <MDBox mb={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Per day </InputLabel>
              <Select
                sx={{ height: 45 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.perday}
                name={"perday"}
                label="Per day  "
              >
                {/* <MenuItem value="">
              <em>None</em>
            </MenuItem> */}
                <MenuItem value={"5"}>5</MenuItem>
                <MenuItem value={"10"}>10</MenuItem>
                <MenuItem value={"15"}>15</MenuItem>
                <MenuItem value={"20"}>20</MenuItem>
                <MenuItem value={"25"}>25</MenuItem>
                <MenuItem value={"30"}>30</MenuItem>
              </Select>
            </FormControl>
            {formik.touched.perday && formik.errors.perday ? (
              <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.perday}</div>
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
          <div>
            <MDButton type="submit" color="primary" variant="contained" size="small">
              {loader ? <CircularProgress size={20} /> : "Updating"}
            </MDButton>
          </div>
          {/* <div>
            <MDButton onClick={props.handleClose} color="primary" variant="contained" size="small">
              Cancel
            </MDButton>
          </div> */}
        </div>
        {/* <Button type="submit" onClick={formik.handleSubmit} autoFocus>
    Create TODO
  </Button> */}
      </form>
    </div>
  );
}

export default Settings;
