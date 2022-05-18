import React, {useState, useEffect,useRef} from 'react'

export default function Pomodoro() {
    let Ref = useRef(0);

    let [ss, setss] = useState(20)
    let [click, setClick] = useState(null)
    //setting the Usestates

    let clickHandler = (event) =>{
        let clicked = event.target.value;

       setClick(clicked);
       runTimer()
       e.preventDefault()
    }
   

   let runTimer = ()=>{
       while (ss>0){
           setInterval(
            setss(ss+1)
           , 1000);
    
}
   }

   

  return (
    <div>
      <h1>{ss}</h1>
      <button onClick={clickHandler}>Start Countdown</button>
      <h2>check render:{ref.current} </h2>
    </div>
  )
}
