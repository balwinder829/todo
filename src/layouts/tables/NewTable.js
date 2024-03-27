import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Pagination } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditToDo from "./EditToDo";
import MDSnackbar from "components/MDSnackbar";
export default function NewTable(props) {
  // console.log(props.data.data)
  const [open, setOpen] = React.useState(false);
  const [EditData, setEditData] = useState();
  const handlePageChange = (event, value) => {
    props.getpage(value);
    // You can perform other actions like fetching data for the new page here
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleShow = (val) => {
    setEditData(val);
    setOpen(true);
  };
  const [infoSB, setInfoSB] = useState(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const renderInfoSB = (
    <MDSnackbar
      bgWhite
      title="Todo updated successfully"
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
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Tags
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {props.data?.data?.data?.map((val, i) => {
              return (
                <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {val.title}
                  </th>
                  <td className="px-6 py-4">{val.status}</td>
                  <td className="px-6 py-4">{val.tags}</td>
                  <td className="px-6 py-4">{val.description}</td>
                  <td className="px-6 py-4">{val.action_date}</td>
                  <td className="px-6 py-4">
                    <EditIcon
                      size="15"
                      onClick={() => {
                        handleShow(val);
                      }}
                    />
                  </td>
                  {console.log({ val })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="m-3">
          <Pagination
            onChange={handlePageChange}
            page={props.data?.data?.current_page}
            count={props.data?.data?.page / 20}
          />
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle className="min-w-96" id="alert-dialog-title">
          {"Edit To Do "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <EditToDo getpage={props.getpage} Data={EditData} setInfoSB={setInfoSB} handleClose={handleClose} />
          </DialogContentText>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      {renderInfoSB}
    </div>
  );
}
