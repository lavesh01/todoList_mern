import './App.css';

import { useEffect, useState } from 'react';

import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList/TodoList';

const API_BASE = "http://localhost:3001";

function App() {
  const [ todos, setTodos ] = useState([]);

  useEffect(() => {
    const getTodos = () => {
        fetch(API_BASE + "/todos")
            .then(res => res.json())
            .then(data => setTodos(data))
            .catch(err => console.error("Error: ", err));
    }
    getTodos();
  },[]);
  
  
  return (
    <div className="App">
      <h1>Todo <span style={{color:"#2196f3"}}>List</span></h1>
      <TodoForm todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
