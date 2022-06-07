import React, {useState, useEffect ,useRef, useContext} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { CircularProgress } from '@mui/material';
import 'react-circular-progressbar/dist/styles.css';
import "./pomodo.css"
import { FaPlayCircle, FaPause } from "react-icons/fa";
import SettingContext from '../../settings/settingcontext';
import { BsBootstrapReboot } from "react-icons/bs";
import {Howl, Howler} from 'howler';

import Stopwatch from '../stopwatch/stopwatch';
const soundSrc = "https://www.soundjay.com/clock/clock-ticking-2.mp3"

var sound = new Howl({
  src: soundSrc,
  loop: true,
  volume: 1,
  html5: true,
  preload:true
});

export default function Pomodoro() {
  
 let settingcontext =  useContext(SettingContext);
 let [ispaused, setIspaused]=useState(false)
 let [secondsleft, setSecondsleft] = useState(0);
 let [rounds, setRounds] = useState (settingcontext.rounds*2-1)
 let [mode, setMode] = useState("work") //"work" || "shortbrk" || "longbrk"
 
let ispausedRef = useRef(ispaused)
let secondsleftRef = useRef(secondsleft)
let modedRef = useRef(mode)
let roundsRef = useRef (rounds)





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

let resethndler = ()=>{
  settingcontext.setStateswitch(false)
  setIspaused(false)
  ispausedRef.current = false;
  secondsleftRef.current = settingcontext.worktime*60;
  setSecondsleft(settingcontext.worktime*60);
  setRounds(settingcontext.rounds*2-1);
      roundsRef.current= settingcontext.rounds*2-1;

}


useEffect(()=>{

  let switchMode=()=>{
    console.log("switchmode : ", roundsRef.current);
    let nextmode = modedRef.current==="work" 
    ? roundsRef.current > 0? "shortbrk": "longbrk" 
    : "work" ;
    setMode(nextmode);
    modedRef.current = nextmode;

    let nextSesson = nextmode ==="work" 
    ? (settingcontext.worktime*60) 
    : nextmode === "longbrk" ?
    (settingcontext.longbrktime*60)
    :(settingcontext.shortbrktime*60);
    console.log("State is: ", nextmode);
    setSecondsleft(nextSesson);
    secondsleftRef.current = nextSesson;
    
    
  }
  let countRound = ()=>{
    //console.log("countrounds before ", roundsRef.current);
    roundsRef.current--;
    setRounds(roundsRef.current);
    //console.log("countrounds aftr s ", roundsRef.current);
    if (roundsRef.current < 0){
      setRounds(settingcontext.rounds*2-1);
      roundsRef.current= settingcontext.rounds*2-1;
    }
   // console.log("countrounds affter ", roundsRef.current);
  }
  
  secondsleftRef.current = settingcontext.worktime*60;
  setSecondsleft(settingcontext.worktime*60);


  let interval = setInterval(()=>{
if (!ispausedRef.current){
return;
}
if (secondsleftRef.current ===0){
  sound.playing()? sound.stop() : sound.play();
  countRound();
  switchMode();
  
}
  else{ 
    Tick();
    }
  },1000);
  
  return ()=> clearInterval(interval);
  

},[settingcontext])
 
const totalSeconds = mode === "work" 
? (settingcontext.worktime*60) 
: mode === "longbrk" ?
(settingcontext.longbrktime*60)
:(settingcontext.shortbrktime*60);
const percentage = Math.round(secondsleft / totalSeconds * 100);

    return (
        <div className='timer'>
          <CircularProgress value={percentage} variant="determinate"  />
          <CircularProgressbar styles={buildStyles({
            textColor: '#ffff',
            trailColor: '#fffff',
            backgroundColor: '#E1EFE6',
            pathColor: `#4e61fd`
          })} value={percentage} text={`0${parseInt(secondsleft/60)}`.slice(-2)+ ":" +`0${secondsleft%60}`.slice(-2)} />
          
          <div className="btnwrap">
            <button className='button' onClick={()=>{sound.stop();resethndler();}}>
              <BsBootstrapReboot className='icon'/>
              </button>
            {!ispaused ? <button className='button' onClick={()=>{sound.play(); initTicker(); settingcontext.setStateswitch(true)}}>
              <FaPlayCircle  className='icon'/>
          </button> : <button className='button' onClick={()=>{sound.stop(); stopTicker();}}>
              <FaPause className='icon'/>
          </button> }
          <p className='roundname'>{Math.floor((rounds+1)/2)} of {settingcontext.rounds} sessions left</p>
          </div>
<Stopwatch/>
        </div>
    )
}
