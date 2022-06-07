import React, { useEffect } from 'react'
import { useState } from 'react';

export default function Todo({todo, todolist, setTodolist, donelist, setDonelist} ) {

  let [tododone, setTododone] = useState(todo.complete)

  
let deleteHandler=()=>{
  setTodolist(todolist.filter(element=> element.id !==todo.id))
  setDonelist(donelist.filter(element=> element.id !==todo.id))
}

let doneHandler=()=>{
  if (donelist.length > 1){
    setDonelist(donelist.shift())
  }
  setTodolist(todolist.filter(element=> element.id !==todo.id));
  setDonelist([...donelist, {text:todo.text, complete:true, id: todo.id}])
  setTododone(true);
 
}


let blankHandler = ()=>{
return;
}


  return (
      <div className={!tododone ? "todo" : "todo completed"}>
        <li className="todo-item">{todo.text}</li>
        <button className='complete-btn' onClick={(!tododone) ? doneHandler : blankHandler}><i className="fas fa-check"></i></button>
        <button className='trash-btn' onClick={deleteHandler}><i className="fas fa-trash"></i></button>
      </div>
  )
}
