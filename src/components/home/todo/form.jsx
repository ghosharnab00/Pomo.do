import React from 'react'
import { useState, useEffect } from 'react';
import "./todo.css"
export default function Form({input, setInput,todolist, setTodolist}) {


  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
      if (input && todolist.length< 5){
        setTodolist([...todolist, {text:input, complete:false, id: (Math.random() *1000)}]);
        
    }
    setInput('');

    event.preventDefault();
  };

  

  let placeholder = (todolist.length === 5)? "Finish this 5 tasks first. Then add new tasks. :D" : "What are you going to do today?" ;
  let readOnly = (todolist.length === 5)? true : false;
  return ( 
    <div>
      <form onSubmit={handleSubmit} >
      <input type="text" className="todo-input" value ={input} onChange={handleChange} placeholder={placeholder} readOnly={readOnly}/>
      <button className="todo-button" type="submit" onClick={()=>{}}>
        <i className="fas fa-plus-square"></i>
      </button>
    </form>
    </div>
  )
}
