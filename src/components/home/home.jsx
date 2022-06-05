import React, { useState, useContext } from 'react'
import Stopwatch from './stopwatch/stopwatch'
import Todo from './todo/todo'
import Form from './todo/form'
import "./home.css"
import Pomodoro from './pomodo/pomodo'
import SettingContext from '../settings/settingcontext'

export default function Home() {
    let settingcontext = useContext(SettingContext);
    const [toggleState, setToggleState] = useState(false);
    const [input, setInput] = useState("")
    const [todolist, setTodolist] = useState([])
    const [donelist, setDonelist] = useState([])

    const toggleSw= () => {
        let state = true;
        setToggleState(state);
    };
    const toggleTimer= () => {
        let state = false;
        setToggleState(state);
    };


function todoIter(item){
    return(
        <Todo item={item} />
    )
}








    return (
        <div className="home">
            <div className="home_left">
                <div className="bloc-tabs">
                    {
                        !settingcontext.stateswitch? <button
                        className={!toggleState ? "tabs active-tabs" : "tabs"}
                        onClick={() => toggleTimer()}>Pomodoro  </button>: <button
                        className={!toggleState ? "tabs active-tabs" : "tabs"}
                        onClick={() => {return;}}>Pomodoro  </button>
                    }
                    {
                        !settingcontext.stateswitch?  <button
                        className={toggleState ? "tabs active-tabs" : "tabs"}
                        onClick={() => {toggleSw() }} >
                        Stopwatch </button>: <button
                        className={toggleState ? "tabs active-tabs" : "tabs"}
                        onClick={() => {return;}}>Stopwatch  </button>
                    }
                    
                   
                </div>

                <div className="content-tabs">
                    <div className ="app">
                    {
                        !toggleState ? <Pomodoro /> : <Stopwatch/>
                    }

                    </div>
                </div>

            </div>
            <div className="home_right">
                <Form input ={input} setInput = {setInput} todolist = {todolist} setTodolist= {setTodolist}/>
                <div className="todo-container">
                    
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
            </div>
        </div>
    )
}
