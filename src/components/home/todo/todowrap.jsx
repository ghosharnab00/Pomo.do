import React from 'react'
import Todo from './todo'
import { useEffect,useState } from 'react';
import axios from 'axios';
import Form from './form';
import { Box } from '@mui/material';


export default function Todowrap() {
  const [input, setInput] = useState("")
  const [isLoggedin,setisLoggedin] = useState(false);
  const [dbtodos, setDbtodos]= useState([]);

  async function getdbTodos() {
    try {
      await axios.get("http://localhost:8080/api/todos",{
        method:"GET",
        withCredentials: true,
      }).then((dataa)=>{
        
        if(dataa.data.isLoggedin===true){
          setisLoggedin(true)
          setDbtodos(dataa.data.todos);
        }
        else{
         
        }
        })
    } catch (error) {
      console.error(error);
    }
  }


  useEffect(() => {
    getdbTodos();
    
  }, [input])

  //setup localstorage

  return (
    <Box>
     
     <Form input ={input} setInput = {setInput} dbtodos={dbtodos}/>
      <ul className="todo-list">
      
      {
          dbtodos.map((todo) => {
            return (
              <Todo todo={todo} key={todo._id} isLogged={isLoggedin} dbtodos={dbtodos} setDbtodos={setDbtodos}/>
            )
          })
        }

      </ul>
      
    </Box>
  )
}
