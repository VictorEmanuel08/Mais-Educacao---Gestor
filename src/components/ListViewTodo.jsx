// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch } from "react-redux";
// import { removeTodo, updateTodo } from '../features/todo/todoSlice'

// const EditTodo = ({ togglePopup, todoId }) => {
//   const dispatch = useDispatch();
//   const newTodoName = useRef();

//   function dis(e, id) {
//     let obj = {
//       id: todoId,
//       updatedTodo: String(newTodoName.current.value),
//     };
//     dispatch(updateTodo(obj));
//   }

//   return (
//     <div>
//       <div>
//         <input></input>
//         <button></button>
//         <button></button>
//       </div>
//     </div>
//   );
// };

// const ListViewTodo = (props) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const dispatch = useDispatch();

//   const togglePopup = (e) => {
//     e.preventDefault();
//     setShowPopup(!showPopup);
//     console.log("toggled");
//   };

//   const deleteTodo = (e) => {
//     e.preventDefault();
//     dispatch(removeTodo(props.todoId));
//   };

//   const onDragStarted = (e, id) => {
//     console.log("Drag has started")
//     e.dataTransfer.setData('todoId', id);
//    };

//   // dispatch ( updateTodo ( { id : props.todoId , updatedTodo : " " } ) )
//   useEffect(() => console.log(showPopup), [showPopup]);
//   return (
//     <div draggable onDragStart={(e)=>onDragStarted(e, props.todoId)}>
//       {showPopup && (
//         <EditTodo togglePopup={togglePopup} todoId={props.todoId} />
//       )}
//       <input type="checkbox "> </input>
//       <p> {props.todoName} </p>
//       <button onClick={togglePopup}> Edit </button>
//       <button onClick={deleteTodo}> Delete </button>
//     </div>
//   );
// };

// export default ListViewTodo;