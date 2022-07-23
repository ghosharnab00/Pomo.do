import React, { useEffect,useState } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DoneAllIcon from '@mui/icons-material/DoneAll';

import { useContext } from "react";
import StateContext from "../statecontext";


export const TodoCompleted = (props) =>{ 

  let statecontext =  useContext(StateContext);
  
  let parcentage = (statecontext.todocompleted/statecontext.totaltodos)*100;







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
            TODOS COMPLETED
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {statecontext.todocompleted}
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
            <DoneAllIcon />
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
          {Math.floor(parcentage)}% todos completed till now
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
}