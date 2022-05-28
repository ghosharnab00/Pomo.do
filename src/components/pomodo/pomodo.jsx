import React, {useState, useEffect ,useRef, useContext} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./pomodo.css"
import { FaPlayCircle, FaPause } from "react-icons/fa";
import SettingContext from '../settings/settingcontext';

export default function Pomodoro() {
  
 let settingcontext =  useContext(SettingContext);
 let [ispaused, setIspaused]=useState(false)
 let [secondsleft, setSecondsleft] = useState(0);
 let [mode, setMode] = useState("work") //"work" || "shortbrk" || "longbrk"
 
let ispausedRef = useRef(ispaused)
let secondsleftRef = useRef(secondsleft)
let modedRef = useRef(mode)

let Tick = ()=>{
  secondsleftRef.current--;
  setSecondsleft(secondsleftRef.current);
}



let initTicker= ()=>{
  setIspaused(true);
  ispausedRef.current = true;
}
let stopTicker=()=>{
  setIspaused(false)
  ispausedRef.current = false;
  //setSecondsleft(secondsleftRef.current);
}



useEffect(()=>{
  let switchMode=()=>{
    let nextmode = modedRef.current==="work" ? "shortbrk" : "work" ;
    setMode(nextmode);
    modedRef.current = nextmode;

    let nextSesson = nextmode ==="work" ? (settingcontext.worktime*60) : (settingcontext.shortbrktime*60);
console.log(nextSesson);
    setSecondsleft(nextSesson);
    secondsleftRef.current = nextSesson;
  }
  
  secondsleftRef.current = settingcontext.worktime*60;
  setSecondsleft(settingcontext.worktime*60);


  let interval = setInterval(()=>{
if (!ispausedRef.current){
return;
}
if (secondsleftRef.current ===0){
  switchMode();
}
  Tick();

//console.log(secondsleftRef.current);
  },1000);
  
  return ()=> clearInterval(interval);
  

},[settingcontext])
 
const totalSeconds = mode !== "work" ? (settingcontext.shortbrktime*60) : (settingcontext.worktime*60);
const percentage = Math.round(secondsleft / totalSeconds * 100);

    return (
        <div className='timer'>
          <CircularProgressbar styles={buildStyles({
            textColor: '#ffff',
            trailColor: '#fffff',
            backgroundColor: '#E1EFE6',
            pathColor: `#4e61fd`
          })} value={percentage} text={`0${parseInt(secondsleft/60)}`.slice(-2)+ ":" +`0${secondsleft%60}`.slice(-2)} />

          <div className="btnwrap">
            {!ispaused ? <button className='button' onClick={()=>{initTicker();}}>
              <FaPlayCircle  className='icon'/>
          </button> : <button className='button' onClick={stopTicker}>
              <FaPause className='icon'/>
          </button> }
          
          </div>


        </div>
    )
}
