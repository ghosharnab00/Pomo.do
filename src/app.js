import "./app.css"
import "./global.css"
import Pomodoro from "./components/pomodo/pomodo";
import Sidebar from "./components/sidebar/sidebar";
import States from "./components/state/state";
import Setting from "./components/settings/setting.jsx";
import {
  BrowserRouter as Router,Routes,
  Route
} from "react-router-dom";
import SettingContext from "./components/settings/settingcontext";
import { useState } from "react";

function App() {
  const [worktime, setWorktime] = useState(25);
  let [shortbrktime, setShortbrktime] = useState(5);
  let [longbrktime, setLongbrktime] = useState(20);
  let [rounds, setRounds] = useState(3);

  return (
    <div className="App">
      <SettingContext.Provider value={{
         worktime,
         shortbrktime,
         longbrktime,
         rounds,
         setWorktime,
         setShortbrktime,
         setLongbrktime,
         setRounds
        
        } }>
       <Router>
       <div className="left">
      <Sidebar/>
       </div>
       <div className="right"> 
       <Routes>
       

       <Route exact path="/" element={<Pomodoro/>}></Route>
          <Route exact path="/state" element={<States/>}></Route>
          <Route exact path="/setting" element={<Setting/>}></Route>

       
       </Routes>
       
         
      
   
    </div>
    </Router>
    </SettingContext.Provider>
    </div>
  );
}

export default App;
