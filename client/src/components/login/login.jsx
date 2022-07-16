import React, {useEffect, useState, useContext} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link, FormControlLabel, Modal, Box } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import SettingContext from '../settings/settingcontext';
import {btnstyle, iconstyle,modelstyle, messageStyle } from "./loginstyle"
const Login=()=>{
const settingcontext = useContext(SettingContext);
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen((settingcontext.issignedin)? false : true)
    // setOpen(settingcontext.issignedin)
    console.log(settingcontext.issignedin)
  }
  
  
  let googleAuth = async(event)=>{
    window.open("http://localhost:8080/api/auth/google","_self")
    }

    
  useEffect(()=>{
    handleOpen();
  },[settingcontext.issignedin])

    return(
        <div >
        <Modal
        open={open}>
        <Box sx={modelstyle}>
   <Button type='submit' color='primary' variant="outlined"  style={btnstyle} startIcon={<GoogleIcon style={iconstyle}/>} onClick={googleAuth} > Sign in With Google Account</Button>
   <Typography style={messageStyle}>Log in to start using the tool now! 😃</Typography>
   </Box>
   </Modal>
        </div>
    )
}

export default Login