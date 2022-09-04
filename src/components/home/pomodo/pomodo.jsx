import React, { useState, useEffect, useRef, useContext } from 'react'
import { CircularProgress, Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReplayIcon from '@mui/icons-material/Replay';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import "./pomodo.css"
import SettingContext from '../../settings/settingcontext';
import { Howl } from 'howler';
import { Tabtiles } from '../../GeneralFunctions';
import axios from 'axios';
import { api } from '../../../data/axiosConfig';


const soundSrc = "https://www.soundjay.com/clock/clock-ticking-2.mp3"

var sound = new Howl({
  src: soundSrc,
  loop: true,
  preload: true,
  volume: 1,
  html5: true
});

export default function Pomodoro() {

  let settingcontext = useContext(SettingContext);
  let [ispaused, setIspaused] = useState(false)
  let [secondsleft, setSecondsleft] = useState(0);
  let [rounds, setRounds] = useState(settingcontext.rounds * 2 - 1);
  let [mode, setMode] = useState("work"); //"work" || "shortbrk" || "longbrk"

  let ispausedRef = useRef(ispaused);
  let secondsleftRef = useRef(secondsleft);
  let modedRef = useRef(mode);
  let roundsRef = useRef(rounds);
  let starttimeRef = useRef("");


  let Tick = () => {
    secondsleftRef.current--;
    setSecondsleft(secondsleftRef.current);

  }

  let initTicker = async () => {
    setIspaused(true);
    ispausedRef.current = true;
    starttimeRef.current = new Date();
    console.log(starttimeRef.current)
   
  }


  let stopTicker = async () => {
    setIspaused(false)
    ispausedRef.current = false;
    if (modedRef.current=== "work"){
      await axios.post(`${api}/pomodo`, { starttime: starttimeRef.current, endtime: new Date() }, { withCredentials: true })
      .then(console.log("done")).catch(error => console.log(error));
    }

  }

  let resethndler = async () => {
    stopTicker();
    settingcontext.setStateswitch(false);
    secondsleftRef.current = settingcontext.worktime * 60;
    setSecondsleft(settingcontext.worktime * 60);
    setRounds(settingcontext.rounds * 2 - 1);
    roundsRef.current = settingcontext.rounds * 2 - 1;
    settingcontext.setTabseconds(0);
  }

  let switchMode = () => {
    
    let nextmode = modedRef.current === "work"
      ? roundsRef.current > 0 ? "shortbrk" : "longbrk"
      : "work";
    setMode(nextmode);
    modedRef.current = nextmode;

    let nextSesson = nextmode === "work"
      ? (settingcontext.worktime * 60)
      : nextmode === "longbrk" ?
        (settingcontext.longbrktime * 60)
        : (settingcontext.shortbrktime * 60);
    // console.log("State is: ", nextmode);
    setSecondsleft(nextSesson);
    secondsleftRef.current = nextSesson;


  }

  let countRound = () => {

    roundsRef.current--;
    setRounds(roundsRef.current);

    if (roundsRef.current < 0) {
      setRounds(settingcontext.rounds * 2 - 1);
      roundsRef.current = settingcontext.rounds * 2 - 1;
    }

  }


let pomodoCounthandler =async()=>{
  if (modedRef.current === "shortbrk" || modedRef.current === "longbrk") {
  axios.get("https://pomo-do.herokuapp.com/api/pomodo/increament", { method: "GET", withCredentials: true })
  }
  else {
    // starttimeRef.current = new Date();
    console.log(starttimeRef.current)
  }
}



  let pomodotimeHandler = async () => {
    if (modedRef.current === "shortbrk" || modedRef.current === "longbrk") {

      await axios.post(`https://pomo-do.herokuapp.com/api/pomodo`, { starttime: starttimeRef.current, endtime: new Date() }, { withCredentials: true })
      .then(console.log("done")).catch(error => console.log(error));
    }

    else {
      starttimeRef.current = new Date();
      console.log(starttimeRef.current)
    }
  }


  useEffect(() => {
    secondsleftRef.current = settingcontext.worktime * 60;
    setSecondsleft(settingcontext.worktime * 60);

    let interval = setInterval(() => {
      if (!ispausedRef.current) {
        return;
      }
      if (secondsleftRef.current === 0) {
        sound.playing() ? sound.stop() : sound.play();
        countRound();
        switchMode();
        pomodoCounthandler();
        pomodotimeHandler();
      }
      else {
        Tick();
      }
    }, 1000);

    return () => clearInterval(interval);


  }, [settingcontext])

  // useEffect(()=>{
  //   console.log(JSON.parse(localStorage.getItem('settings')))
  // },[])


  const totalSeconds = mode === "work"
    ? (settingcontext.worktime * 60)
    : mode === "longbrk" ?
      (settingcontext.longbrktime * 60)
      : (settingcontext.shortbrktime * 60);
  const percentage = Math.round((secondsleft / totalSeconds) * 100);

  Tabtiles(`0${parseInt(secondsleft / 60)}`.slice(-2) + `:` + `0${secondsleft % 60}`.slice(-2) + " ⏳ | Pomo.do")


  return (
    <div className='timer'>
      <Box position="relative" display="inline-flex">

        <CircularProgress variant="determinate" value={percentage}
          style={{
            display: "flex",
            height: "100%",
            width: "250px"
          }} />
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
            color={settingcontext.toggle ? "white" : "black"}
          >{`0${parseInt(secondsleft / 60)}`.slice(-2) + ":" + `0${secondsleft % 60}`.slice(-2)}</Typography>
          <Typography
            variant="caption"
            component="div"
            fontSize="20px"
            fontWeight="800"
            color={settingcontext.toggle ? "white" : "var(--black)"}
          >{mode === "work" ? "Focus" : "Break"}</Typography>
          <Typography color= {settingcontext.toggle ? "var(--offwhite)" : "var(--liteblack)"} fontSize="12px" >Pomo.do</Typography>
        </Box>
      </Box>



      <div className="btnwrap">
        <Button
          className='button'
          variant="outlined"
          startIcon={<ReplayIcon />}
          onClick={() => { sound.stop(); resethndler(); settingcontext.setStateswitch(false) }}
        >
          Reset
        </Button>
        {!ispaused ?
          <Button
            className='button'
            variant="contained"
            onClick={() => { sound.play(); initTicker(); settingcontext.setStateswitch(true) }}
            endIcon={<PlayCircleOutlineIcon />}>
            Start
          </Button>
          : <Button
            className='button'
            variant="contained"
            onClick={() => { sound.stop(); stopTicker(); }}
            endIcon={<PauseCircleOutlineIcon />}>
            Pause
          </Button>}
      </div>
      <Typography color= {settingcontext.toggle ? "var(--offwhite)" : "var(--liteblack)"}>{Math.floor((rounds + 1) / 2)} of {settingcontext.rounds} sessions left</Typography>


    </div>
  )
}
