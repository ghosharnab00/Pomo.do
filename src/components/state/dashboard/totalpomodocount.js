import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import TimerIcon from '@mui/icons-material/Timer';

import { useContext } from "react";
import StateContext from "../statecontext";


export const TotalPomodocount = (props) =>{ 

  let statecontext =  useContext(StateContext);
  


  return(
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
   <CardContent>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL POMODO COUNT
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {statecontext.pomodocount}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'transparent',
              color:"blue",
              height: 52,
              width: 52,
              border:"1px solid blue"
            }}
          >
            <TimerIcon />
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
          {statecontext.pomodocount} Pomodos completed till now
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
}