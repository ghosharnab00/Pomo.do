import React from 'react'
import Todo from './todo'
import { useEffect } from 'react';

export default function Todowrap({todolist,setTodolist,donelist, setDonelist}) {
    let setLocalstorage = ()=>{
        localStorage.setItem("todos", JSON.stringify(todolist));
        
      }
      
      let getLocalTodos= ()=>{
        if (localStorage.getItem("todos")===null){
          localStorage.setItem("todos", JSON.stringify([]));
        }
      else {
       setTodolist(JSON.parse(localStorage.getItem('todos')));
      }
      
      }
      
      
      useEffect(()=>{
        setLocalstorage();
      },[todolist])
      useEffect(()=>{
        getLocalTodos();
        //console.log(todolist)
      },[])


  return (
    <div>
      <ul className="todo-list">
          {
              todolist.map((todo)=>{return(
                <Todo todo={todo} key={todo.id} todolist = {todolist} setTodolist= {setTodolist} donelist={donelist} setDonelist={setDonelist}/>
            )})
          }

      
        
      </ul>
      <ul className="todo-list">
          {
              donelist.map((todo)=>{return(
                <Todo todo={todo} key={todo.id} todolist = {todolist} setTodolist= {setTodolist} donelist={donelist} setDonelist={setDonelist}/>
            )})
          }

      
        
      </ul>
    </div>
  )
}
