import React from "react";
import MDBox from "components/MDBox";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
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
export default function EditToDo(props) {
  const { setInfoSB, handleClose,  Data,getpage } = props;
  const token = useSelector((state) => state.token);
  const Dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      description:Data?.description|| "",
      tags:Data?.tags|| "",
      title:Data?.title|| "",
      action_date:Data?.action_date|| "",
      id:Data?.id|| "",
      // Status: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      description: Yup.string().required("Enter your description"),
      action_date: Yup.string().required("Please select your work day"),
      title: Yup.string().required("Enter your To Do Title"),
      tags: Yup.string().required("Please select your  Tag"),
      // Status: Yup.string().required("Please select your  Status"),
    }),
    onSubmit: (values, { resetForm }) => {
      ExportApi.updateToDo(values, token)
        .then((resp) => {
          if (resp.data) {
            console.log(resp.data);
            if (resp.data.status == "Token is Expired") {
              Dispatch(setUser("{}"));
              Dispatch(incrementByAmount(""));
            }
            if (resp.data.message == "Success") {
                getpage(1)
                 resetForm()
                 setInfoSB(true)
                 handleClose()
            }
          }
        })
        .catch((err) => console.log(err));
    },
  });
  return (
    <div>
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
              value={formik.values.action_date}
              plaseholder="kk"
              type="date"
              label="Work Day"
              fullWidth
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
              row={5}
              fullWidth
            />
            {formik.touched.description && formik.errors.description ? (
              <div style={{ color: "red", fontSize: "15px" }}>{formik.errors.description}</div>
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
        </MDBox>
        <Button onClick={handleClose}>Cancel</Button>
        <MDButton type="submit">Update TODO</MDButton>
        {/* <Button type="submit" onClick={formik.handleSubmit} autoFocus>
                Create TODO
              </Button> */}
      </form>
    </div>
  );
}
