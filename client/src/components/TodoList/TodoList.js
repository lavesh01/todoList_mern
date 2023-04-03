import "./TodoList.css";

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';

const API_BASE = "http://localhost:3001";

export const TodoList = ({ todos, setTodos }) => {
  
  const completeTodo = async (id) => {
    const data = await fetch( API_BASE + "/todo/complete/" + id, {method: "PUT"})
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
    const data = await fetch( API_BASE + "/todo/delete/" + id, {method: "DELETE"})
      .then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }
    
  const handleDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
  
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
  
    setTodos(items);

  await fetch( API_BASE + `/todo/updatePosition/${reorderedItem._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      position: result.destination.index
    })
  });

  
    const updatedTodos = items.map((todo, index) => ({
      ...todo,
      position: index
    }));
    
    await fetch( API_BASE + "/todo/updatePositions", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        todos: updatedTodos
      })
    });

  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {todos.map((todo, index) => (
              <Draggable key={todo._id} draggableId={todo._id} index={index}>
                {(provided) => (
                  <ListItem
                    dense
                    className="list"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      textDecoration: todo.complete ? 'line-through' : 'none'
                    }}
                  >
                    <Checkbox tabIndex={-1} disableRipple onClick={() => completeTodo(todo._id)} checked={todo.complete} />
                    <ListItemText primary={todo.list} />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={() => deleteTodo(todo._id)}>
                        <DeleteIcon style={{color:"black"}} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>

  )
}
