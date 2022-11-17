import React, { useState, useContext } from 'react'
import Stopwatch from './stopwatch/stopwatch'
import "./home.css"
import Pomodoro from './pomodo/pomodo'
import SettingContext from '../settings/settingcontext'
import Todowrap from './todo/todowrap'
import { Box, Container, Grid } from '@mui/material'
import MaterialUISwitch from "./todo/materialuiswitch"
import rain from "../../images/rain.png";
import { useEffect } from "react";
import RainASMR from "../../sounds/rain.mp3";
import OceanASMR from "../../sounds/Ocean.mp3";
import whiteNoiseASMR from "../../sounds/whiteNoise.mp3";
import waves from "../../images/waves.png";
import WhiteNoise from "../../images/whiteNoise.png";

const Rain = new Audio(RainASMR);
const Ocean = new Audio(OceanASMR);
const whiteNoise = new Audio(whiteNoiseASMR);


export default function Home() {

  let settingcontext = useContext(SettingContext);
  const [toggleState, setToggleState] = useState(false);
  const [rainVolume, setRainVolume] = useState(0);
  const [oceanVolume, setOceanVolume] = useState(0);
  const [whiteNoiseVolume, setWhiteNoiseVolume] = useState(0);


  Rain.loop = true;
  Ocean.loop = true;
  whiteNoise.loop = true;
  
  Ocean.volume = oceanVolume;
  Rain.volume = rainVolume;
  whiteNoise.volume = whiteNoiseVolume;

  Rain.play();
  Ocean.play();
  whiteNoise.play();


  const togglestate = () => {
    let state = !toggleState ? true : false;
    setToggleState(state);
  };


  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py:14.5,
        paddingBottom:'0'
      }}
    >
      <Container maxWidth={false}>
        <Grid spacing={6} container justifyContent={"space-evenly"}>
          <Grid
          item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <div className="bloc-tabs">

              <MaterialUISwitch sx={{ m: 1 }} onChange={togglestate} disabled={settingcontext.stateswitch ? true : false} />
            </div>

            <div className="content-tabs">
              <div className="app">
                {
                  (!toggleState) ? <Pomodoro /> : <Stopwatch />
                }

              </div>
            </div>
<Box className="otherSoundsContainer" >

        <div className="allign">
          <input
            className="soundDial"
            type="range"
            orient="vertical"
            min={0}
            max={1}
            value={rainVolume}
            onChange={(event) => {
              setRainVolume(event.target.valueAsNumber);
            }}
            step={0.2}
          />
          <div className="otherSounds">
            <img src={rain} className="imgSizing" alt="Rain" />
          </div>
        </div>
        <div className="allign">
          <input
            className="soundDial"
            type="range"
            orient="vertical"
            min={0}
            max={1}
            value={oceanVolume}
            onChange={(event) => {
              setOceanVolume(event.target.valueAsNumber);
            }}
            step={0.2}
          />
          <div className="otherSounds">
            <img src={waves} className="imgSizing" alt="Waves" />
          </div>
        </div>
        <div className="allign">
          <input
            className="soundDial"
            type="range"
            orient="vertical"
            min={0}
            max={1}
            value={whiteNoiseVolume}
            onChange={(event) => {
              setWhiteNoiseVolume(event.target.valueAsNumber);
            }}
            step={0.2}
          />
          <div className="otherSounds">
            <img src={WhiteNoise} className="imgSizing" alt="Whitenoise" />
          </div>
        </div>
  
  </Box>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <Todowrap />
          </Grid>




        </Grid>



      </Container>

    </Box>



  )
}
