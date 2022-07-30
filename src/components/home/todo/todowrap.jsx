import React from 'react'
import Todo from './todo'
import { useEffect,useState } from 'react';
import axios from 'axios';
import Form from './form';
import { Box } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

export default function Todowrap() {
  const [input, setInput] = useState("")
  const [isLoggedin,setisLoggedin] = useState(false);
  const [dbtodos, setDbtodos]= useState([]);

  async function getdbTodos() {
    try {
      await axios.get("https://pomo-do.herokuapp.com/api/todos",{
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
    toast.promise(getdbTodos(), {
      loading: 'Getting todos...',
      success: 'Tasks successfully retrived',
      error: 'Could not get todo',
    });
    
  }, [])

  useEffect(()=>{
    getdbTodos();
  },[input])
  //setup localstorage

  return (
    <Box>
     <Toaster
  position="top-center"
  reverseOrder={false}
/>
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
