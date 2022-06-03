import React, { useEffect, useRef, useState,useContext } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Howl } from 'howler';
import { FaPlayCircle, FaPause } from "react-icons/fa";
import SettingContext from '../../settings/settingcontext';
import { BsBootstrapReboot } from "react-icons/bs";
import "./stopwatch.css"
const soundSrc = "https://www.soundjay.com/clock/clock-ticking-2.mp3"



var sound = new Howl({
  src: soundSrc,
  loop: true,
  volume: 1,
  html5: true,
  preload:true
});

export default function Stopwatch() {
    let [ispaused,setIspaused ] = useState(false);
    let [seconds, setSeconds] = useState (0);

    let secondsref = useRef(seconds)
    let ispausedRef = useRef(ispaused);
    let watch = useRef(0);

    let Tick = ()=>{
        secondsref.current+=1;
        setSeconds(secondsref.current);
}
    
    let initTicker= ()=>{
        ispausedRef.current = true
        setIspaused(true);
        
      }
      let stopTicker=()=>{
        ispausedRef.current = false
        setIspaused(false)
        //setSecondsleft(secondsleftRef.current);
      }
      
      let resethndler = ()=>{
        setIspaused(false)
        ispausedRef.current = false;
        secondsref.current=0;
        setSeconds(0);
        
      }


 useEffect(()=>{
watch.current = setInterval(()=>{
    if (!ispausedRef.current){
        return;
        }
    Tick();
},1000)
return () => clearInterval(watch.current)
 },[])     

let percantage = ((seconds%60)/60)*100

  return (
    <div>
      <div className='stopwatch'>
          
          <CircularProgressbar
          ssbar styles={buildStyles({
            textColor: '#ffff',
            trailColor: '#fffff',
            backgroundColor: '#E1EFE6',
            pathColor: `#4e61fd`
          })} value={percantage} text={`0${parseInt(seconds/60)}`.slice(-2)+ ":" +`0${seconds%60}`.slice(-2)} />

          <div className="btnwrap">
            <button className='button' onClick={()=>{sound.stop();resethndler();}}>
              <BsBootstrapReboot className='icon'/>
              </button>
            {!ispaused ? <button className='button' onClick={()=>{sound.play(); initTicker(); }}>
              <FaPlayCircle  className='icon'/>
          </button> : <button className='button' onClick={()=>{sound.stop(); stopTicker();}}>
              <FaPause className='icon'/>
          </button> }
          
          </div>

        </div>
    </div>
  )
}
