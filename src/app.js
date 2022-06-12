<<<<<<< HEAD
import React, { useEffect } from 'react'
import "./App.css"
=======
import React from 'react'
import "./app.css"
>>>>>>> parent of f7cff65 (Update app.js)
import "./global.css"
import Sidebar from "./components/sidebar/sidebar";
import States from "./components/state/state";
import Setting from "./components/settings/setting.jsx";
import {
  BrowserRouter as Router,Routes,
  Route
} from "react-router-dom";
import SettingContext from "./components/settings/settingcontext";
import { useState } from "react";
import Home from "./components/home/home";
import Pomodoro from "./components/home/pomodo/pomodo";
import Stopwatch from "./components/home/stopwatch/stopwatch";
import { Tabtiles } from "./components/GeneralFunctions";
import { Grid, Divider } from "@mui/material";


function App() {
  const [worktime, setWorktime] = useState(30);
  let [shortbrktime, setShortbrktime] = useState(5);
  let [longbrktime, setLongbrktime] = useState(20);
  let [rounds, setRounds] = useState(3);
  let [stateswitch, setStateswitch] = useState(false)
  let [tabseconds, setTabseconds] = useState(0)

useEffect(()=>{
  localStorage.setItem('todos',[]);
  localStorage.setItem('dones',[]);
},[])
  Tabtiles(`0${parseInt(tabseconds/60)}`.slice(-2)+ ":" +`0${tabseconds%60}`.slice(-2) + " ⏳ | " + "Pomo.do" )
  return (
    <div className="App">
      <SettingContext.Provider value={{
         worktime,
         shortbrktime,
         longbrktime,
         rounds,
         stateswitch,
         tabseconds,
         setWorktime,
         setShortbrktime,
         setLongbrktime,
         setRounds,
         setStateswitch,
         setTabseconds
        } }>
       <Router>
       <Grid container>
       <Grid item xs className="left">
      <Sidebar/>
      
       </Grid>
       <Grid item xs className="right"> 
       
       <Routes>
       

        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/pomodoro" element={<Pomodoro/>}></Route>
        <Route exact path="/stopwatch" element={<Stopwatch/>}></Route>
          <Route exact path="/state" element={<States/>}></Route>
          <Route exact path="/setting" element={<Setting/>}></Route>

       
          </Routes>
   
        </Grid>
       </Grid>
      </Router>
     </SettingContext.Provider>
    </div>
  );
}

export default App;
