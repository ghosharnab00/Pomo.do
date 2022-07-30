import React, { useState, useContext } from 'react'
import Stopwatch from './stopwatch/stopwatch'
import "./home.css"
import Pomodoro from './pomodo/pomodo'
import SettingContext from '../settings/settingcontext'
import Todowrap from './todo/todowrap'
import { Box, Container, Grid } from '@mui/material'
import MaterialUISwitch from "./todo/materialuiswitch"



export default function Home() {

  let settingcontext = useContext(SettingContext);
  const [toggleState, setToggleState] = useState(false);



  // JSON.parse(localStorage.getItem('todos'))
  // JSON.parse(localStorage.getItem('dones'))

  const togglestate = () => {
    let state = !toggleState ? true : false;
    setToggleState(state);
  };


  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py:18,
        paddingBottom:"6%"
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
