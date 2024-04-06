import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditToDo from "./EditToDo";
import MDSnackbar from "components/MDSnackbar";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./index.css"
const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png'
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png'
  },
  {
    id: 'kvn',
    name: 'KVN',
    thumb: '/images/kvn.png'
  },
  {
    id: 'mooncake',
    name: 'Mooncake',
    thumb: '/images/mooncake.png'
  },
  {
    id: 'quinn',
    name: 'Quinn Ergon',
    thumb: '/images/quinn.png'
  }
]

export default function NewTable(props) {
//   // console.log(props.data.data)
//   const [open, setOpen] = React.useState(false);
//   const [EditData, setEditData] = useState();
//   const [Sections, setSections] = useState(props.data?.data?.data);
//   const handlePageChange = (event, value) => {
//     props.getpage(value);
//     // You can perform other actions like fetching data for the new page here
//   };
//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleShow = (val) => {
//     setEditData(val);
//     setOpen(true);
//   };
//   const [infoSB, setInfoSB] = useState(false);
//   const closeInfoSB = () => setInfoSB(false);
//   const renderInfoSB = (
//     <MDSnackbar
//       bgWhite
//       title="Todo updated successfully"
//       content=""
//       color="success"
//       icon="check"
//       dateTime=""
//       open={infoSB}
//       onClose={closeInfoSB}
//       close={closeInfoSB}
//     />
//   );
//   let NewArray=[
//     {
//       id:1,
//       title:"a"
//     },
//     {
//       id:2,
//       title:"a"
//     },
//     {
//       id:3,
//       title:"a"
//     },
//     {
//       id:4,
//       title:"a"
//     },
//   ]
//   const [characters, setupdateCharacters] = useState([
//     {
//       id:1,
//       title:"a"
//     },
//     {
//       id:2,
//       title:"b"
//     },
//     {
//       id:3,
//       title:"c"
//     },
//     {
//       id:4,
//       title:"d"
//     },
//   ]);
//   useEffect(() => {
//     console.log(props.data?.data?.data)
//     // setupdateCharacters(props.data?.data?.data);
//   }, [props.data?.data?.data]);

//   function handleOnDragEnd(result) {
//     console.log({ result });
//     // if (!result.destination) return;

//     const items = Array.from(characters);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setupdateCharacters(items);
//   }
//   // useEffect(() => {
//   //   setupdateCharacters()
//   // }, [])
  
//   return (
//     <div>
//       <div className="relative overflow-x-auto">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 Title
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Status
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Tags
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Description
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Action Date
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* {props.data?.data?.data?.map((val, i) => {
//               return (
//                 <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
//                   <th
//                     scope="row"
//                     className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
//                   >
//                     {val.title}
//                   </th>
//                   <td className="px-6 py-4">{val.status}</td>
//                   <td className="px-6 py-4">{val.tags}</td>
//                   <td className="px-6 py-4">{val.description}</td>
//                   <td className="px-6 py-4">{val.action_date}</td>
//                   <td className="px-6 py-4">
//                     <EditIcon
//                       size="15"
//                       onClick={() => {
//                         handleShow(val);
//                       }}
//                     />
//                   </td>
//                 </tr>
//               );
//             })} */}
//           </tbody>
//         </table>
//         {/* {props.data?.data?.data?.length>0? */}
//         <DragDropContext onDragEnd={handleOnDragEnd}>
//           <Droppable droppableId="characters">
//             {(provided) => (
//               <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
//                 {characters?.map(({id, title}, index) => {
//                   return (
//                     <Draggable key={id} draggableId={id} index={index}>
//                       {(provided) => (
//                         <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
//                           <div className="characters-thumb">
//                             {/* <img src={thumb} alt={`${name} Thumb`} /> */}
//                           </div>
//                           <p>
//                             { title }
//                           </p>
//                         </li>
//                       )}
//                     </Draggable>
//                   );
//                 })}
//                 {/* {provided.placeholder} */}
//               </ul>
//             )}
//           </Droppable>
//         </DragDropContext>
//         {/* :null} */}
//         {/* <div className="m-3">
//           <Pagination
//             onChange={handlePageChange}
//             page={props.data?.data?.current_page}
//             count={props.data?.data?.page / 20}
//           />
//         </div> */}
//       </div>
//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//       >
//         <DialogTitle className="min-w-96" id="alert-dialog-title">
//           {"Edit To Do "}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             <EditToDo getpage={props.getpage} Data={EditData} setInfoSB={setInfoSB} handleClose={handleClose} />
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions></DialogActions>
//       </Dialog>
//       {renderInfoSB}
//     </div>
//       );
// }
const [characters, setupdateCharacters] = useState(props.data?.data?.data);

function handleOnDragEnd(result) {
  if (!result.destination) return;

  const items = Array.from(characters);
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);

  setupdateCharacters(items);
}
  useEffect(() => {
    console.log(props.data?.data?.data)
    setupdateCharacters(props.data?.data?.data);
  }, [props.data?.data?.data]);
return (
  <div className="App">
    <header className="App-header">
      <h1>Final Space Characters</h1>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              {characters?.map(({id, title, thumb}, index) => {
                return (
                  <Draggable key={id} draggableId={title} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="characters-thumb">
                          {/* <img src={thumb} alt={`${name} Thumb`} /> */}
                        </div>
                        <p>
                          { title }
                        </p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              {characters?.map(({id, title, thumb}, index) => {
                return (
                  <Draggable key={id} draggableId={title} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="characters-thumb">
                          {/* <img src={thumb} alt={`${name} Thumb`} /> */}
                        </div>
                        <p>
                          { title }
                        </p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              {characters?.map(({id, title, thumb}, index) => {
                return (
                  <Draggable key={id} draggableId={title} index={index}>
                    {(provided) => (
                      <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className="characters-thumb">
                          {/* <img src={thumb} alt={`${name} Thumb`} /> */}
                        </div>
                        <p>
                          { title }
                        </p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </header>
    <p>
      Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
    </p>
  </div>
);
}
