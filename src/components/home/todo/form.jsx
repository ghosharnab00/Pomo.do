import React from 'react'
import "./todo.css"
import { Paper, InputBase, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



export default function Form({ input, setInput, todolist, setTodolist }) {


  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    if (input && todolist.length < 5) {
      setTodolist([...todolist, { text: input, complete: false, id: (Math.random() * 1000) }]);

    }
    setInput('');

    event.preventDefault();
  };



  // let placeholder = (todolist.length === 5) ? "Finish this 5 tasks first. Then add new tasks. :D" : "What are you going to do today?";
  // let readOnly = (todolist.length === 5) ? true : false;



  return (
    <form onSubmit={handleSubmit}>
      {todolist.length}
      <Paper 
      elevation={5}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: 400,
          boxShadow: '1px 1px 10px -1px #1976d2, 0px -1px 0px 0px #1976d2, 10px 5px 10px -1px #1976d2',
          borderRadius: '50px'
        }}>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={"What are you going to do today?"}
          readOnly={false}
          onChange={handleChange}
          value={input}
        />
        <IconButton
          type="submit"
          sx={{
            p: "5px",
            color: '#1976d2'
          }}
          aria-label="add"
        >
          <AddIcon />
        </IconButton>

      </Paper>
    </form>
  )
}
