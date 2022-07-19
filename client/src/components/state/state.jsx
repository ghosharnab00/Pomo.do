import React from "react";
import { Box, Container, Grid } from '@mui/material';
import { TotalPomodo } from './dashboard/totalpomodo';
import { LatestOrders } from './dashboard/latest-orders';
import { LatestProducts } from './dashboard/latest-products';
import { Sales } from './dashboard/sales';
import { TasksProgress } from './dashboard/tasks-progress';
import { TotalCustomers } from './dashboard/total-customers';
import { TotalProfit } from './dashboard/total-profit';
import { TrafficByDevice } from './dashboard/traffic-by-device';
import { useState,useEffect } from "react";
import axios from "axios";
import StateContext from "./statecontext";

const State = () => {
  let [pomodostate, setpomodoState]= useState({starttime: "1",
    timenow: ""});

    // axios.all([axios.get(`firstrequest`),
    //        axios.get(`secondrequest`),
    //        axios.get(`thirdrequest`)])
    //  .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {  
    //      console.log(firstResponse.data,secondResponse.data, thirdResponse.data);
    //  }))
    //  .catch(error => console.log(error));

let getState = async()=>{
  try {
    await axios.get("http://localhost:8080/api/pomodo",{
      method:"GET",
      withCredentials: true,
    }).then((dataa)=>{
      setpomodoState({
        starttime: dataa.data.starttime,
        timenow: dataa.data.timenow
      });
     

      
      })
  } catch (error) {
    console.error(error);
  }
}

useEffect(()=>{
  getState();
  console.log(pomodostate.timenow);
},[])
  
  
  return(
  <>
  <StateContext.Provider value={{
    pomodostate,
    setpomodoState
         } }>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 18
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalPomodo/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalProfit sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
           <LatestProducts sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </StateContext.Provider>
  </>
);}



export default State;
