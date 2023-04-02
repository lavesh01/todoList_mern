import "./TodoList.css";

import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';

// import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
// import React, { useEffect, useState } from 'react'








// import axios from "axios";

export const TodoList = ({ todos, setTodos }) => {
  
  const completeTodo = async (id) => {
    
    const data = await fetch("http://localhost:3001/todo/complete/" + id)
      .then(res => res.json());

      setTodos(todos => todos.map(todo => {
        if(todo._id === data._id){
          todo.complete = data.complete;
        }

        return todo;
      }
      ));

  }


  const deleteTodo = async (id) => {
    const data = await fetch("http://localhost:3001/todo/delete/" + id, {method: "DELETE"})
      .then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }
    
  return (
  
    <List>
    {todos.map((todo) => (
      <ListItem 
        key={todo._id} 
        dense 
        className="list" 
        style={ { textDecoration : todo.complete ? 'line-through' : 'none' } } 
      >
        <Checkbox tabIndex={-1} disableRipple  onClick={() => completeTodo(todo._id)} />
        <ListItemText primary={todo.list} />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Delete"
            onClick={() => deleteTodo(todo._id)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
  )
}
