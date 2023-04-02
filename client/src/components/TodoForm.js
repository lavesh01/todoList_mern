import React, { useEffect, useState } from 'react'

import { TextField } from '@mui/material';

const API_BASE = "http://localhost:3001";

export const TodoForm = ({ todos, setTodos}) => {
    const [newTodo, setNewTodo] = useState("");

useEffect(() => {
    addTodo();
},[])

const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            list: newTodo
        })
    }).then(res => res.json());
    
    setTodos([...todos, data]);
}


  return (
    <div>
        <form
            onSubmit={(e) => {
                e.preventDefault() 
                setNewTodo("")
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
            <button onClick={addTodo} >Add</button>
        </form>
    </div>
  )
}
