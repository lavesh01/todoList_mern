import React, { useState } from 'react'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { TextField } from '@mui/material';

const API_BASE = "http://localhost:3001";

export const TodoForm = ({ todos, setTodos}) => {
    const [newTodo, setNewTodo] = useState("");

const addTodo = async () => {
    if (!newTodo) {
      return;
    }
  
    // const newPosition = todos.length > 0 ? todos[todos.length - 1].position + 1 : 1;
    
  
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        list: newTodo,
        position: todos.length,
      }),
    }).then((res) => res.json());

      // loop through existing todos to update positions
//   const updatedTodos = todos.map((todo) => {
//     if (todo.position >= newPosition) {
//       return { ...todo, position: todo.position + 1 };
//     } else {
//       return todo;
//     }
//   });

  console.log(data);

  
    setTodos([...todos, data]);
    setNewTodo("");
  };

//   const addTodo = async () => {
//     if (!newTodo) {
//       return;
//     }
  
//     // Get the current highest position in the list
//     // const maxPosition = todos.length > 0 ? Math.max(...todos.map((todo) => todo.position)) : 0;
  
//     // Create the new todo item with the correct position
//     // const newTodoItem = {
//     //   list: newTodo,
//     //   position: maxPosition + 1,
//     // };
  
//     // Update the positions of all the other items in the list
//     const updatedTodos = todos.map((todo) => {
//       if (todo.position >= newTodoItem.position) {
//         return {
//           ...todo,
//           position: todo.position + 1,
//         };
//       } else {
//         return todo;
//       }
//     });
  
//     // Send the updated list of todos to the backend
//     const data = await fetch(API_BASE + "/todo/new", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         ...newTodoItem,
//         todos: updatedTodos,
//       }),
//     }).then((res) => res.json());
  
//     // Update the local state with the new todo item
//     setTodos([...updatedTodos, data]);
//     setNewTodo("");
//   };
  

  return (
    <div>
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addTodo() ;
            }}
        >
            <TextField
                variant="outlined"
                placeholder="Add todo"
                margin="normal"
                onChange={(e) => {
                    setNewTodo(e.target.value);
                }}
                value={newTodo}
            />
            <button>    
                <AddCircleIcon />
            </button>
        </form>
    </div>
  )
}
