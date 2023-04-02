import "./TodoForm.css";

import React, { useState } from 'react'

import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';

const API_BASE = "http://localhost:3001";

export const TodoForm = ({ todos, setTodos}) => {
    const [newTodo, setNewTodo] = useState("");

    const addTodo = async () => {
        if (!newTodo) {
        return;
        }
    
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

    
        setTodos([...todos, data]);
        setNewTodo("");
    };

  return (
    <div className="container">
        <form
            onSubmit={(e) => {
                e.preventDefault();
                addTodo() ;
            }}
        >
            <TextField
                className="input"
                variant="outlined"
                placeholder="Add todo"
                autoComplete="off"
                margin="normal"
                onChange={(e) => {
                    setNewTodo(e.target.value);
                }}
                value={newTodo}
            />
            <button className="btn" type="submit">
                <AddIcon />
            </button>
            
        </form>
    </div>
  )
}
