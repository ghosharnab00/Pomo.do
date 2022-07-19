import React, { useEffect,useState } from "react";
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import { useContext } from "react";
import StateContext from "../statecontext";
import axios from "axios";


export const TotalPomodo = (props) =>{ 

  let statecontext =  useContext(StateContext);
  let [total, setTotal] = useState()



  let getState = async()=>{
  
       axios.all([axios.get("http://localhost:8080/api/pomodo",{
        method:"GET",
        withCredentials: true,
      }),
           axios.get("http://localhost:8080/api/todos",{
            method:"GET",
            withCredentials: true,
          })])
     .then(axios.spread((pomododata, tododata) => {  
         console.log(pomododata.data,tododata.data);
     }))
     .catch(error => console.log(error));
    //   await axios.get("http://localhost:8080/api/pomodo",{
    //     method:"GET",
    //     withCredentials: true,
    //   }).then((dataa)=>{
    //     statecontext.setpomodoState({
    //       starttime: dataa.data.starttime,
    //       timenow: dataa.data.timenow
    //     });
    //     let time = (new Date(dataa.data.timenow).getTime() - new Date(dataa.data.starttime).getTime());
    //     setTotal(time);
    //     })
    // } catch (error) {
    //   console.error(error);
    // }
  }
  
  useEffect(()=>{
    getState();
  },[])
  








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
            TOTAL TIME
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {`${new Date(total).getHours()}:${new Date(total).getMinutes()}:${new Date(total).getSeconds()}`}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'blue',
              height: 56,
              width: 56
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
          {new Date(total).getSeconds()} Since the beginning
        </Typography>
      </Box>
    </CardContent>
  </Card>
);
}