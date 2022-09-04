import React from "react";
import { Box, Container, Grid } from '@mui/material';
import { TotalPomodo } from './dashboard/totalpomodo';
import { TodoCompleted } from './dashboard/todocompleted';
import { TotalPomodocount } from './dashboard/totalpomodocount';
import { TotalTodos } from './dashboard/totoaltodos';
import { useState,useEffect } from "react";
import axios from "axios";
import StateContext from "./statecontext";
import toast, { Toaster } from 'react-hot-toast';
import { api, axiosconfig } from '../../data/axiosConfig'

const State = () => {
  let [total, setTotal] = useState()
  let [pomodocount, setPomodocount]=useState();
  let [totaltodos, setTotaltodos]=useState();
  let [todocompleted, setTodocompleted]= useState();

    let getState = async()=>{
  
      axios.all([axios.get(api+"/pomodo", axiosconfig),
          axios.get(api+"/todos",axiosconfig)])
    .then(axios.spread((pomododata, tododata) => {  

      setTotal(pomododata.data.pomodotime);
      let pomodo = pomododata.data.pomodocount ? pomododata.data.pomodocount : 0;
      setPomodocount(pomodo);
      setTodocompleted(tododata.data.todocompleted);
      let todo = tododata.data.todocount ? tododata.data.todocount : 0;
      setTotaltodos(todo);
      
        
    }))
    .catch(error => console.log(error));
 }
 
 useEffect(()=>{
  toast.promise(getState(), {
    loading: 'Getting Stats...',
    success: 'Stats successfully retrived',
    error: 'Could not get Stats',
  });
 },[])
 


  return(
  <>
  <StateContext.Provider value={{
    total,
    pomodocount, 
    totaltodos, 
    todocompleted, 
    setTotal,
    setPomodocount,
    setTotaltodos,
    setTodocompleted

         } }>
          <Toaster/>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 15,
        paddingBottom:"0"

      }}
    >
      <Container maxWidth={false} >
        <Grid
          container
          spacing={8}
          sx={{justifyContent:"center"}}
        >
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <TotalPomodo/>
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
           <TotalPomodocount />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
           <TotalTodos />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <TodoCompleted/>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </StateContext.Provider>
  </>
);}



export default State;
