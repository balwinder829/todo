import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import uuid from "uuid/v4";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
} from "@mui/material";
import EditToDo from "./EditToDo";
import MDSnackbar from "components/MDSnackbar";
import moment from "moment";


const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App(props) {
  // console.log(props.data.data.data)
  const columnsFromBackend = {
    "51": {
      name: "To do",
      items: props?.data?.data?.data,
    },
    "53": {
      name: "In Progress",
      items: [],
    },
    "54": {
      name: "Done",
      items: [],
    },
  }
  const [columns, setColumns] = useState(columnsFromBackend);
  const [open, setOpen] = React.useState(false);
  const [EditData, setEditData] = useState();
    const handleClose = () => {
    setOpen(false);
  };
  const handleShow = (val) => {
    setEditData(val);
    setOpen(true);
  };
    const [infoSB, setInfoSB] = useState(false);
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
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
        {Object.entries(columns)?.map(([columnId, column], index) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              key={columnId}
            >
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver ? "lightblue" : "lightgrey",
                          padding: 4,
                          width: 250,
                          minHeight: 500,
                        }}
                      >
                        {column.items.map((item, index) => {
                          return (
                            <Draggable key={item.id.toString()} draggableId={item.id.toString()} index={index}>
                              {(provided, snapshot) => {
                                return (
                                  <div 
                                    onClick={()=>{handleShow(item)}}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: "none",
                                      padding: 16,
                                      margin: "0 0 8px 0",
                                      minHeight: "50px",
                                      backgroundColor: snapshot.isDragging ? "#263B4A" : "#456C86",
                                      color: "white",
                                      ...provided.draggableProps.style,
                                    }}
                                  >
                                    <p className="">{item.title}</p>
                                    <div className="small flex justify-between">
                                      <p className="">Tags:{item.tags}</p>
                                    </div>
                                    <p className="medium mt-2">{item.description}</p>
                                      <p className="small text-end">Date:{moment(item.action_date).format('ll')}</p>
                                    
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
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

export default App;
