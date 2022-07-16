import React, { useState, useContext,useEffect } from 'react'
import Stopwatch from './stopwatch/stopwatch'
import Form from './todo/form'
import "./home.css"
import Pomodoro from './pomodo/pomodo'
import SettingContext from '../settings/settingcontext'
import Todowrap from './todo/todowrap'
import { Stack } from '@mui/material'
import MaterialUISwitch from "./todo/materialuiswitch"




export default function Home() {

  let settingcontext = useContext(SettingContext);
  const [toggleState, setToggleState] = useState(false);


    
    // JSON.parse(localStorage.getItem('todos'))
    // JSON.parse(localStorage.getItem('dones'))

    const togglestate= () => {
        let state = !toggleState ? true : false;
        setToggleState(state);
    };
    

    return (
          <Stack className='home' direction="row" spacing={3}>
            
        <div className="home_left">
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
        
        </div>
        <div className="home_right">
                
                    <Todowrap className="todo-container"/>
        </div>
      </Stack>
                
        
    )
}
