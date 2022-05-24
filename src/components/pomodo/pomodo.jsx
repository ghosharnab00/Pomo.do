import React, {useState, useEffect ,useRef} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./pomodo.css"
import Pausebutton from '../pausebutton';
import Playbutton from '../playbutton';


export default function Pomodoro() {
 
 

  
  

  
    return (
      <div className=''>
        <div className='timer'>
          <CircularProgressbar styles={buildStyles({
            textColor: '#160C28',
            trailColor: '#160C28',
            backgroundColor: '#E1EFE6',
            pathColor: `rgba(443, 1, 123, ${60 / 100})`
          })} value={60} text={`${60}%`} />
        
          <Playbutton/>
          <Pausebutton/>


        </div>
        </div>
    )
}
