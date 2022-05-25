import "./app.css"
import "./global.css"
import Pomodoro from "./components/pomodo/pomodo";
import Sidebar from "./components/sidebar/sidebar";
import States from "./components/state/state";
import Setting from "./components/settings/states/settings";
import {
  BrowserRouter as Router,Routes,
  Route
} from "react-router-dom";

//import CountDownTimer from "./components/demotim";
function App() {
  return (
    <div className="App">
       
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
    
    </div>
  );
}

export default App;
