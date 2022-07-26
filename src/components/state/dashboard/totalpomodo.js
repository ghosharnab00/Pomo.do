import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import { useContext } from "react";
import StateContext from "../statecontext";



export const TotalPomodo = (props) =>{ 

  let statecontext =  useContext(StateContext);
  
  console.log()
  let seconds = Math.floor(statecontext.total/ 1000)% 60;
  let minutes = Math.floor(statecontext.total / 60000)%60;
  let hours = Math.floor(statecontext.total / 3600000);

  return(
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
   <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL POMODO TIME
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {`0${hours}`.slice(-2) +`:`+`0${minutes}`.slice(-2)+`:` + `0${seconds}`.slice(-2)}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'blue',
              height: 52,
              width: 52
            }}
          >
            <WbSunnyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon color="success" />
        
        <Typography
          color="textSecondary"
          variant="caption"
        >
          {new Date(hours).getSeconds()} hours since the beginning
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
}