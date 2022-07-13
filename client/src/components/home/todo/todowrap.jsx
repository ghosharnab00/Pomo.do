import React from 'react'
import Todo from './todo'
import { useEffect,useState } from 'react';
import axios from 'axios';


export default function Todowrap() {

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
          console.log(dataa.data.todos.length)
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
    
    
  }, [])






  //setup localstorage
  


  return (
    <div>
      <ul className="todo-list">
      
        {
          dbtodos.map((todo) => {
            return (
              <Todo todo={todo} key={todo._id} todolist={dbtodos} isLogged={isLoggedin} />
            )
          })
        }

      </ul>
    </div>
  )
}
