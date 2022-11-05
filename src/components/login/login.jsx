import React, {useEffect, useState, useContext} from 'react'
import {  Button, Typography, Modal, Box, Divider, FormControl , InputLabel, OutlinedInput, InputAdornment, IconButton} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import SettingContext from '../settings/settingcontext';
import {btnstyle, iconstyle,modelstyle, messageStyle } from "./loginstyle";
import { api, request } from '../../data/axiosConfig'
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Login=()=>{

const settingcontext = useContext(SettingContext);
  const [open, setOpen] = useState(true);
  const [userdata, setUserdata]=useState({
    email:"",
    pass:""
  })
  const [passVisibility, setPassVisibility] = useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setPassVisibility({
      ...passVisibility, showPassword: !passVisibility.showPassword 
    });
      
  }
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

     await axios.post(`${api}/register?username=${userdata.email}&password=${userdata.pass}`)
      .then(function (response) {
        console.log(response.data.token);
        localStorage.setItem('access_token', JSON.stringify(response.data.token));
        localStorage.setItem('isLoggedIn', JSON.stringify(true))
        setOpen(false)
      })
      .then(()=>window.location.reload(true))
      .catch(function (error) {
        console.log(error);
      })

      
      
  }


  const handleOpen = () => {
    setOpen((settingcontext.issignedin)? false : true)

  }
  
  

  useEffect(()=>{
    handleOpen();
  },[settingcontext.issignedin])

  useEffect(()=>{
    if(typeof(localStorage.isLoggedIn)===undefined || localStorage.isLoggedIn===""){

    }
    else if(localStorage.isLoggedIn===undefined){
      
      
    }
    else{
      setOpen(!JSON.parse(localStorage.isLoggedIn))
    }
    
  },[])

    return(
        <div >
        <Modal
        open={open}>
        <Box sx={modelstyle}>
          <form 
          noValidate 
          style={{flexDirection:'column'}}
          onSubmit={handleSubmit}
          >
            <Typography style={messageStyle}>Log in/Register to start using the tool now! <span role="img" aria-label='emoji'>😃</span></Typography>
            <FormControl>
            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
            <OutlinedInput
                  id="outlined-adornment-email-login"
                  type="email"
                  name="email"
                  label="Email Address / Username"
                  value={userdata.email}
                  onChange={(e)=>{
                    setUserdata({...userdata,
                      email:e.target.value
                    })}}
                  style={btnstyle}
                  required
                  />                                                               
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="outlined-adornment-email-login">PassWord</InputLabel>
            <OutlinedInput
                  id="outlined-adornment-email-login"
                  type={passVisibility.showPassword ? 'text' : 'password'}
                  name="Password"
                  label="Password"
                  value={userdata.pass}
                  onChange={(e)=>{
                    setUserdata({...userdata,
                      pass:e.target.value
                    })}}
                    endAdornment={
                      <InputAdornment position="end">
                          <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                          >
                              {passVisibility.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                      </InputAdornment>
                  }
                  style={btnstyle}
                  inputProps={{}}
                  required
                  />             
            </FormControl>
            <Button
                        disableElevation
                        // disabled={isSubmitting}
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{border: "1px solid grey",
                        borderRadius:"50px",
                         width: "325px",
                         maxWidth: "400px",
                         minWidth: "min-content"}}
                    >
                        Sign in
                    </Button>
          </form>
  
   <Divider sx={{paddingTop:'10px'}}/>
   <Button color='primary'  style={btnstyle} onClick={()=>setOpen(false)} > Use as A Guest </Button>
   <Typography color="red" style={messageStyle}>You can't use the ToDo and Stats if you use Guest Mode</Typography>
   </Box>
   </Modal>
        </div>
    )
}

export default Login
