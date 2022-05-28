import React, {useState, useEffect ,useRef, useContext} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./pomodo.css"
import { FaPlayCircle, FaPause } from "react-icons/fa";
import SettingContext from '../settings/settingcontext';



export default function Pomodoro() {
  
 let settingcontext =  useContext(SettingContext);
 let [ispaused, setIspaused]=useState(false)
 let [secondsleft, setSecondsleft] = useState(settingcontext.worktime*60);
 let timer = useRef(secondsleft)

 let initTicker=()=>{
   
  setIspaused(true)
  Tick(secondsleft);
 }

let stopTicker = ()=>{
  setIspaused(false)
  clearInterval(timer.current);
}




let Tick = (e)=>{
 timer.current = setInterval(()=>{
e--;
setSecondsleft(e);
 },10)
 }



 
    return (
        <div className='timer'>
          <CircularProgressbar styles={buildStyles({
            textColor: '#ffff',
            trailColor: '#fffff',
            backgroundColor: '#E1EFE6',
            pathColor: `#4e61fd`
          })} value={secondsleft/60} text={`${parseInt(secondsleft/60)}:${secondsleft}`} />

          <div className="btnwrap">
            {!ispaused ? <button className='button' onClick={initTicker}>
              <FaPlayCircle  className='icon'/>
          </button> : <button className='button' onClick={stopTicker}>
              <FaPause className='icon'/>
          </button> }
          
          </div>


        </div>
    )
}
