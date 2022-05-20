import React, {useState, useEffect,useRef} from 'react'

export default function Pomodoro() {
  let [ss, setSS] = useState(1500)
  let [[sec,min,hr], setTime] = useState([`0${0}`.slice(-2),`0${25}`.slice(-2),`0${2}`.slice(-2)])
  let [pause, setPause] = useState(false)
  let [resume, setResume] = useState(false)

  let timer  = useRef(0)
  
  let startCount = (e)=>{
    setPause(true)
    setResume(true)
    timer.current = setInterval(()=>{
      setSS(ss--)
      setTime([ `0${(ss % 60)}`.slice(-2),`0${Math.floor(ss / 60) % 60}`.slice(-2),`0${Math.floor(ss / 3600)}`.slice(-2)]) 
    },10)
    
   
  }
  if (ss<0){
    clearInterval(timer.current);
    setTime([`0${0}`.slice(-2),`0${0}`.slice(-2),`0${0}`.slice(-2)])
    setSS(1500);
  }

  let hndlPause = ()=>{
    clearInterval(timer.current);
    setPause(false)
    setResume(true)
    
  }
  let hndlResume = ()=>{
    setResume(false)
    setPause(true)
    timer.current = setInterval(()=>{
      setSS(ss--)
      setTime([ `0${(ss % 60)}`.slice(-2),`0${Math.floor(ss / 60) % 60}`.slice(-2),`0${Math.floor(ss / 3600)}`.slice(-2)])
    },1000)
  }
  let stopCount = ()=>{
    setPause(false)
    setResume(false)
    clearInterval(timer.current)
    setSS(1500);
    setTime([`0${0}`.slice(-2),`0${0}`.slice(-2),`0${0}`.slice(-2)])
  }


  
    return (
      <div>
        <h1>{hr}:{min}:{sec}:{ss}</h1>
        {
          !pause && !resume ? 
          <button onClick={startCount}>Start</button> :
          pause ? <button onClick={hndlPause}>Pause</button> : 
          !pause && resume ? <button onClick={hndlResume}>Resume</button> : 
           <button onClick={hndlPause}>Pause</button>
        }

          <button onClick={stopCount}>Stop</button>


      </div>
    )
}
