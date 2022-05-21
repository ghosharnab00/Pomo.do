import React, {useState, useEffect ,useRef} from 'react'

export default function Pomodoro() {
  const [worktime, setWorktime] = useState("");
  const [work, setWork] = useState(false)
  const [brk, setbrk] = useState(false)
  const [brktime, setBrktime] = useState("");
  let [ss, setSS] = useState(`0${0}`.slice(-2))
  let [[sec,min,hr], setTime] = useState([`0${0}`.slice(-2),`0${0}`.slice(-2),`0${0}`.slice(-2)])
  let [pause, setPause] = useState(false)
  let [resume, setResume] = useState(false)

  let timer  = useRef(0)
  





//handling the work pomodoro function
  function workHandler(event){
    let wt = event.target.value;
    setWorktime(event.target.value);
    setSS((event.target.value*60))
    setTime([`0${(wt*60 % 60)}`.slice(-2),`0${Math.floor(wt*60 / 60) % 60}`.slice(-2),`0${Math.floor(wt*60 / 3600)}`.slice(-2)])
    
 }

 //handling the break pomodoro function
 let breakHandler = (event) =>{
  let bt = event.target.value
  setBrktime(event.target.value);
  if (ss<0){
  setSS((event.target.value*60))
  setTime([`0${(bt*60 % 60)}`.slice(-2),`0${Math.floor(bt*60 / 60) % 60}`.slice(-2),`0${Math.floor(bt*60 / 3600)}`.slice(-2)])
}
}


  let startCount = (e)=>{
    setSS((e*60))
    setPause(true)
    setResume(true)
    timer.current = setInterval(()=>{
      setSS(e--)
      setTime([ `0${(e % 60)}`.slice(-2),`0${Math.floor(e / 60) % 60}`.slice(-2),`0${Math.floor(ss / 3600)}`.slice(-2)]) 
    },10) 
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
    },10)
  }

  //function to stop the count
  let stopCount = ()=>{
    setPause(false)
    setResume(false)
    clearInterval(timer.current)
    setSS(worktime);
    setTime([`0${0}`.slice(-2),`0${0}`.slice(-2),`0${0}`.slice(-2)])
  }


  if (ss<0){
    clearInterval(timer.current);
    setbrk(true);
    setTime([`0${0}`.slice(-2),`0${0}`.slice(-2),`0${0}`.slice(-2)])
    setSS(worktime*60);
  }

 

  
  

  
    return (
      <div>
  
        <input type="text" name="worktime" onChange={workHandler} value= {worktime}  placeholder="Put your focus time:"required/>
        <br/>
        <input type="text" name="brktime"  onChange={breakHandler} value= {brktime} placeholder="Put your break time:"required/> 
        <br/>
        <button onClick={startCount}>Start</button>
        <h2>{worktime} : {brktime}</h2>
        <div>
        <h1>{hr}:{min}:{sec}:{ss}</h1>
        {
          pause ? <button onClick={hndlPause}>Pause</button> : 
          !pause && resume ? <button onClick={hndlResume}>Resume</button> : 
           <button onClick={hndlPause}>Pause</button>
        }
          <button onClick={stopCount}>Stop</button>

          </div>
      </div>
    )
}
