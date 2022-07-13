import { Paper , Box, Typography, IconButton} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useState } from 'react';

export default function Todo({todo, todolist, isLogged} ) {

  let [tododone, setTododone] = useState(todo.complete)

  
let deleteHandler=()=>{
  
}

let doneHandler=()=>{
  
 
}


let blankHandler = ()=>{

}


  return (
    <Box
    display="flex"
    justifyContent='center' >
      <Paper 
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderRadius: '50px'
      }}
      className={!tododone ? "todo" : "todo completed"}>
        <li className="todo-item"><Typography>{todo.text}</Typography></li>
        <IconButton
          type="submit"
          sx={{
            p: "5px",
            color: 'green'
          }}
          aria-label="finished"
          onClick={(!tododone) ? doneHandler : blankHandler}
        >
          <DoneIcon />
        </IconButton>
        <IconButton
          type="submit"
          sx={{
            p: "5px",
            color: 'rgba(255, 0, 0, 0.874)'
          }}
          aria-label="delete"
          onClick={deleteHandler}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
      </Box>
  )
}
