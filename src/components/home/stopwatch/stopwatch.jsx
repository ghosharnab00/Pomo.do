import React, { useEffect, useRef, useState,useContext } from 'react'
import SettingContext from '../../settings/settingcontext';
import { CircularProgress, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import "./stopwatch.css"


export default function Stopwatch() {
  let settingcontext = useContext(SettingContext);
    let [ispaused,setIspaused ] = useState(false);
    let [seconds, setSeconds] = useState (0);

    let secondsref = useRef(seconds)
    let ispausedRef = useRef(ispaused);
    let watch = useRef(0);

    let Tick = ()=>{
        secondsref.current+=1;
        setSeconds(secondsref.current);
        settingcontext.setTabseconds(secondsref.current);
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
        settingcontext.setTabseconds(0);
        
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
      <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={percantage}
          style={{display: "flex",
          height: "100%",
          width: "250px"}} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography
          variant="caption"
          component="div"
          fontSize="40px"
          fontWeight="800"
          color="var(--black)"
        >{`0${parseInt(seconds/60)}`.slice(-2)+ ":" +`0${seconds%60}`.slice(-2)}</Typography>
         <Typography
          variant="caption"
          component="div"
          fontSize="20px"
          fontWeight="800"
          color="var(--black)"
        >{"tick tick.."}</Typography>
         <Typography color="var(--liteblack)" fontSize="12px" >Stopwatch</Typography>
      </Box>
    </Box>
          <div className="btnwrap">
          <Button 
          className='button' 
          variant="outlined" 
          startIcon={<ReplayIcon />} 
          onClick={()=>{resethndler();settingcontext.setStateswitch(false)}}
          >
            Reset
          </Button>
            {!ispaused ? 
            <Button 
            className='button' 
            variant="contained" 
            onClick={()=>{ initTicker(); settingcontext.setStateswitch(true)}} 
            endIcon={<PlayCircleOutlineIcon />}>
            Start
          </Button>
            : <Button 
            className='button' 
            variant="contained" 
            onClick={()=>{stopTicker();}} 
            endIcon={<PauseCircleOutlineIcon />}>
            Pause
          </Button>}
          
          </div>

        </div>
    </div>
  )
}
