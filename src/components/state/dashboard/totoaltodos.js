import React from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DoneIcon from '@mui/icons-material/Done';

import { useContext } from "react";
import StateContext from "../statecontext";


export const TotalTodos = (props) =>{ 

  let statecontext =  useContext(StateContext);

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
            TOTAL TODOS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {statecontext.totaltodos}
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
            <DoneIcon />
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
          {statecontext.totaltodos} todos since the beginning
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
}