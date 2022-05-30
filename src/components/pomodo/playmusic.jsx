import React, { useState, useEffect } from "react";
import {Howl, Howler} from 'howler';

  
export default function Player() {
let [ispaused, setIspaused] = useState(false);
const soundSrc = "https://www.soundjay.com/clock/clock-ticking-2.mp3"
    
        var sound = new Howl({
            src: soundSrc,
            loop: true,
            volume: 1,
            html5: true,
            preload:true
          });
          
    let setPause =()=>{
        setIspaused(true);
        
    }

    let setPlay =()=>{
        setIspaused(false);
       
    }
    var sound = new Howl({
        src: soundSrc,
        loop: true,
        volume: 1,
        html5: true,
        preload:true
      });




  return (
    <div>
        {!ispaused ? <button className='button' onClick={()=>{setPause();}}>
              Play
          </button> : <button className='button' onClick={()=>{setPlay();}}>
              Pause
          </button> }
          <button className='button' onClick={()=>{sound.playing() ? sound.pause() : sound.play();}}>
              Pause
          </button> 
    </div>
  )
}
