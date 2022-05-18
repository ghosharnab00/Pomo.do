import React, {useState, useEffect} from 'react'

export default function Pomodoro() {
    let [ss, setss] = useState(10)
    let [click, setClick] = useState(null)
    //setting the Usestates

    let clickHandler = (event) =>{
        let clicked = event.target.value;
       console.log(clicked)
       setClick(clicked)
       runTimer()
    }
   let  runTimer = (event)=>{
       while (ss!==0){
        setInterval(setss(ss-1),10000);
    }
   }

   

  return (
    <div>
      <h1>{ss}</h1>
      <button onClick={clickHandler}>Start Countdown</button>

    </div>
  )
}
