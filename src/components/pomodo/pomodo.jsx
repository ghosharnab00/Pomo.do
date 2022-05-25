import React, {useState, useEffect ,useRef} from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./pomodo.css"
import { FaPlayCircle, FaPause } from "react-icons/fa";



export default function Pomodoro() {
 
 
  
    return (
        <div className='timer'>
          <CircularProgressbar styles={buildStyles({
            textColor: '#ffff',
            trailColor: '#fffff',
            backgroundColor: '#E1EFE6',
            pathColor: `#4e61fd`
          })} value={10} text={`${10}%`} />

          <div className="btnwrap">
          <button className='button'>
              <FaPlayCircle  className='icon'/>
          </button>
          <button className='button'>
              <FaPause className='icon'/>
          </button>
          </div>


        </div>
    )
}
