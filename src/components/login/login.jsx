import React, {useEffect, useState, useContext} from 'react'
import {  Button, Typography, Modal, Box, Divider, FormControl , InputLabel, OutlinedInput} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import SettingContext from '../settings/settingcontext';
import {btnstyle, iconstyle,modelstyle, messageStyle } from "./loginstyle";
import { api } from '../../data/axiosConfig'
const Login=()=>{

const settingcontext = useContext(SettingContext);
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen((settingcontext.issignedin)? false : true)
  }
  
  

  useEffect(()=>{
    handleOpen();
  },[settingcontext.issignedin])

    return(
        <div >
        <Modal
        open={open}>
        <Box sx={modelstyle}>
          <form 
          noValidate 
          style={{flexDirection:'column'}}
          // onSubmit={handleSubmit}
          >
            <Typography style={messageStyle}>Log in/Register to start using the tool now! <span role="img" aria-label='emoji'>😃</span></Typography>
            <FormControl>
            <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
            <OutlinedInput
                  id="outlined-adornment-email-login"
                  type="email"
                  name="email"
                  label="Email Address / Username"
                  value=""
                  onChange
                  style={btnstyle}
                  />                                                               
            </FormControl>
            <FormControl>
            <InputLabel htmlFor="outlined-adornment-email-login">PassWord</InputLabel>
            <OutlinedInput
                  id="outlined-adornment-email-login"
                  type="Password"
                  name="Password"
                  label="Password"
                  value=""
                  onChange
                  style={btnstyle}
                  />             
            </FormControl>
            <Button
                        disableElevation
                        // disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
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
   <Button color='secondary'  style={btnstyle} onClick={()=>setOpen(false)} > Use as A Guest </Button>
   <Typography color="red" style={messageStyle}>You can't use the ToDo and Stats if you use Guest Mode</Typography>
   </Box>
   </Modal>
        </div>
    )
}

export default Login
