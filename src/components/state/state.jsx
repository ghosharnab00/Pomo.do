import React from "react";
import { Box, Container, Grid } from '@mui/material';
import { TotalPomodo } from './dashboard/totalpomodo';
import { TodoCompleted } from './dashboard/todocompleted';
import { TotalPomodocount } from './dashboard/totalpomodocount';
import { TotalTodos } from './dashboard/totoaltodos';
import { useState,useEffect } from "react";
import axios from "axios";
import StateContext from "./statecontext";

const State = () => {
  let [total, setTotal] = useState()
  let [pomodocount, setPomodocount]=useState();
  let [totaltodos, setTotaltodos]=useState();
  let [todocompleted, setTodocompleted]= useState();

    let getState = async()=>{
  
      axios.all([axios.get("https://pomo-do.herokuapp.com/api/pomodo",{
       method:"GET",
       withCredentials: true,
     }),
          axios.get("https://pomo-do.herokuapp.com/api/todos",{
           method:"GET",
           withCredentials: true,
         })])
    .then(axios.spread((pomododata, tododata) => {  

      setTotal(pomododata.data.pomodotime);
      let pomodo = pomododata.data.pomodocount ? pomododata.data.pomodocount : 0;
      setPomodocount(pomodo);
      setTodocompleted(tododata.data.todocompleted);
      let todo = tododata.data.todocount ? tododata.data.todocount : 0;
      setTotaltodos(todo);
      
        
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
 
    // axios.all([axios.get(`firstrequest`),
    //        axios.get(`secondrequest`),
    //        axios.get(`thirdrequest`)])
    //  .then(axios.spread((firstResponse, secondResponse, thirdResponse) => {  
    //      console.log(firstResponse.data,secondResponse.data, thirdResponse.data);
    //  }))
    //  .catch(error => console.log(error));


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
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 18

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
            <TodoCompleted sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
    </StateContext.Provider>
  </>
);}



export default State;
