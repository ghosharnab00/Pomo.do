import React, {useContext} from 'react'
import "./settings.css"
import SettingContext from './settingcontext'
import { Typography, Box, Slider, Container,Grid } from '@mui/material'

const workmarks = [
  {
    value: 5,
    label: '5 mins',
  },
  {
    value: 30,
    label: '30 mins',
  },
  {
    value: 60,
    label: '60 mins',
  },
  {
    value: 100,
    label: '100°C',
  },
];

const longbrkmarks = [
  {
    value: 1,
    label: '1 min',
  },
  {
    value: 5,
    label: '5 mins',
  },
  {
    value: 13,
    label: '13 mins',
  },
  {
    value: 15,
    label: '15 mins',
  },
  {
    value: 30,
    label: '30 mins',
  },
  {
    value: 20,
    label: '20 mins',
  }
];

const rounds = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 13,
    label: '13',
  },
  {
    value: 15,
    label: '15',
  },
  {
    value: 30,
    label: '30',
  },
  {
    value: 20,
    label: '20',
  }
]

function Setting() {
  let settingsInfo = useContext(SettingContext);
  
let newWrokduration = (e) =>{
  settingsInfo.setWorktime(e.target.value);
}
let newLongbrkduration= (e) =>{
  settingsInfo.setLongbrktime(e.target.value);
}
let newShortbrkduration= (e) =>{
  settingsInfo.setShortbrktime(e.target.value);
}
let newRounds= (e) =>{
  settingsInfo.setRounds(e.target.value);
}
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py:4
      }}
    >
      <Container maxWidth={false} >
        <Grid className='home' spacing={1} container justifyContent={"center"} flexDirection={"column"}>
        <div className="sliderwrap">
      <Box width={300} >
      <Typography className= "leble" fontSize={20}>Work duration</Typography>
      <Slider
        size="small"
        defaultValue={settingsInfo.worktime}
        aria-label="Small"
        valueLabelDisplay="auto"
        min={5}
        max={60}
        onChange={newWrokduration}
        marks={workmarks}
        step={5}
        key={Math.random(0,100)}
      />
    </Box>
     

      </div>
<div className="sliderwrap">
      <Box width={300} >
      <Typography className= "leble" fontSize={20}>Long Brake duration</Typography>
      <Slider
        size="small"
        defaultValue={settingsInfo.longbrktime}
        aria-label="Small"
        valueLabelDisplay="auto"
        min={15}
        max={30}
        onChange={newLongbrkduration}
        marks={longbrkmarks}
        step={5}
        key={Math.random(0,100)}
      />
    </Box>
     

      </div>
<div className="sliderwrap">
<Box width={300} >
      <Typography className= "leble" fontSize={20}>Short Brake duration</Typography>
      <Slider
        size="small"
        defaultValue={settingsInfo.shortbrktime}
        aria-label="Small"
        valueLabelDisplay="auto"
        min={1}
        max={15}
        onChange={newShortbrkduration}
        marks={longbrkmarks}
        step={1}
        key={Math.random(0,100)}

      />
    </Box>
</div>
<div className="sliderwrap">
<Box width={300} >
      <Typography className= "leble" fontSize={20}>Rounds</Typography>
      <Slider
        size="small"
        defaultValue={settingsInfo.rounds}
        aria-label="Small"
        valueLabelDisplay="auto"
        min={1}
        max={13}
        onChange={newRounds}
        marks={rounds}
        step={1}
        key={Math.random(0,100)}
      />
    </Box>
</div>
        </Grid>
        </Container>
        </Box>
  
    
  )
}

export default Setting
