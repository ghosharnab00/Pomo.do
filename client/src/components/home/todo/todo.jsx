import { Paper , Box, Typography, IconButton} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useState } from 'react';
import axios from 'axios';

export default function Todo({todo, isLogged, newdbtodo, setDbtodos} ) {

  let [tododone, setTododone] = useState(todo.complete)

  
  async function deletedbHandler(){
    
  try{
    await axios.delete(`http://localhost:8080/api/todos`, {data:{ id: todo._id }, withCredentials: true})
    deleteHandler();    
  }
  catch (error) {
    console.error(error);
  }
}

const deleteHandler=()=>{
  let newdb = newdbtodo.filter(object => {
    return object._id !== todo._id;
  })
  setDbtodos(newdb);
}

async function doneHandler(){
  
  try{
    await axios.put(`http://localhost:8080/api/todos`, {id: todo._id }, {withCredentials: true})
    console.log(newdbtodo);
    newdbtodo[newdbtodo.findIndex(el => el._id === todo._id)].complete=true
    console.log(newdbtodo);
    setDbtodos(newdbtodo);
  }
  catch (error) {
    console.error(error);
  }
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
          onClick={doneHandler}
          //onClick={(!tododone) ? doneHandler : blankHandler}
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
          onClick={()=>{deletedbHandler();}}
        >
          <DeleteIcon />
        </IconButton>
      </Paper>
      </Box>
  )
}
