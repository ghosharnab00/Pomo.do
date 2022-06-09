import React, { useState, useContext, useEffect } from 'react'
import Stopwatch from './stopwatch/stopwatch'
import Todo from './todo/todo'
import Form from './todo/form'
import "./home.css"
import Pomodoro from './pomodo/pomodo'
import SettingContext from '../settings/settingcontext'
import Todowrap from './todo/todowrap'
import { Switch, Stack } from '@mui/material'
import { MenuItem } from '@mui/material'
import {styled}  from '@mui/material/styles'


const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {

        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="${encodeURIComponent('#fff',)}" d="M6.382 5.968A8.962 8.962 0 0 1 12 4c2.125 0 4.078.736 5.618 1.968l1.453-1.453 1.414 1.414-1.453 1.453a9 9 0 1 1-14.064 0L3.515 5.93l1.414-1.414 1.453 1.453zM13 12V7.495L8 14h3v4.5l5-6.5h-3zM8 1h8v2H8V1z"/></svg>')`},
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : 'var(--litegreen)',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? 'var(--black)' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path fill="white" d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm3.536 5.05L10.586 12 12 13.414l4.95-4.95-1.414-1.414z"/></svg>')`},
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : 'var(--orange)',
      borderRadius: 20 / 2,
    },
  }));

export default function Home() {
    
    let settingcontext = useContext(SettingContext);
    const [toggleState, setToggleState] = useState(false);
    const [input, setInput] = useState("")
    const [todolist, setTodolist] = useState(JSON.parse(localStorage.getItem('todos')))
    const [donelist, setDonelist] = useState(JSON.parse(localStorage.getItem('dones')))

    const togglestate= () => {
        let state = !toggleState ? true : false;
        setToggleState(state);
    };
    

// function todoIter(item){
//     return(
//         <Todo item={item} />
//     )
// }





    return (
          <Stack className="home" direction="row" spacing={2}>
        <MenuItem className="home_left">
        <div className="bloc-tabs">

                <MaterialUISwitch sx={{ m: 1 }} onChange={togglestate} disabled={settingcontext.stateswitch ? true : false}/>           
                </div>

                <div className="content-tabs">
                    <div className ="app">
                    {
                        !toggleState ? <Pomodoro /> : <Stopwatch/>
                    }

                    </div>
                </div>
        
        </MenuItem>
        <MenuItem className="home_right">
        <Form input ={input} setInput = {setInput} todolist = {todolist} setTodolist= {setTodolist}/>
                <div className="todo-container">
                    <Todowrap todolist = {todolist} setTodolist= {setTodolist} donelist={donelist} setDonelist={setDonelist}/>
      
    </div>
        </MenuItem>
      </Stack>
        
                
        
    )
}
