import React, { useEffect, useState, useContext } from 'react'
import {Avatar, Menu, MenuItem} from "@mui/material"
import SettingContext from '../settings/settingcontext'
import axios from "axios"
import "./userdetails.css"
import { api, axiosconfig, request } from '../../data/axiosConfig'

export default function Signin() {
  const settingcontext = useContext(SettingContext);
let [user, setUser]= useState('');
const [anchorEl, setAnchorEl] = useState(null)

function stringToColour(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xFF;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColour(name),
    },
    children: `${name.toUpperCase().split(' ')[0][0]}`,
  };
}


let signOut = async(e)=>{
  await request({ url:'/logout', method:'get'})
  .then(()=>{
    localStorage.setItem('access_token', '');
    localStorage.setItem('isLoggedIn', '')
    settingcontext.setIssignedin(false)

  })
  .then(()=>window.location.reload(true))
    settingcontext.setIssignedin(false)
}

const handleClose = () => {
  setAnchorEl(null)
}

const openMenu = (event) => {
  //console.log(event.currentTarget)
  setAnchorEl(event.currentTarget)
}


async function getUser() {
  try {
    await axios.get(api+"/success",axiosconfig)
    .then((dataa)=>{
      console.log(dataa.data)
      setUser(dataa.data.username)

        if (dataa.data.isLoggedin){
          settingcontext.setIssignedin(true)
          // settingcontext.setStarttime(dataa.data.user.pomodostarttime);
        }
        else{
          settingcontext.setIssignedin(false)
        }
      })
  } catch (error) {
    console.error(error);
  }
}



useEffect(()=>{
  getUser();
},[])
useEffect(()=>{
  getUser();
},[settingcontext.issignedin])
  return (
    
      <form className="login">
        <Avatar {...stringAvatar(user)} onClick={openMenu}/>
        
        <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>
      
        </form>
  )
}


// import React, { useEffect, useState, useContext } from 'react'
// import {Avatar, Box, Menu, MenuItem, Typography} from "@mui/material"
// import SettingContext from '../settings/settingcontext'
// import axios from "axios"
// import "./userdetails.css"
// import { api, axiosconfig } from '../../data/axiosConfig'




// export default function Signin() {
// const settingcontext = useContext(SettingContext);
// let [user, setUser]= useState('');
// const [anchorEl, setAnchorEl] = useState(null)




// let signOut = async(e)=>{
//   window.open(api+"/logout","_self")
//   setUser({googleId: null,
//     picture: null,
//     username: null})
//     settingcontext.setIssignedin(false)
// }

// const handleClose = () => {
//   setAnchorEl(null)
// }

// const openMenu = (event) => {
//   setAnchorEl(event.currentTarget)
// }

// async function getUser() {
//   try {
//     await axios.get(api+"/success",axiosconfig)
//     .then((dataa)=>{
//       console.log(dataa.data)
//       setUser(dataa.data.username)

//         if (dataa.data.isLoggedin){
//           settingcontext.setIssignedin(true)
//           settingcontext.setStarttime(dataa.data.user.pomodostarttime);
//         }
//         else{
//           settingcontext.setIssignedin(false)
//         }
//       })
//   } catch (error) {
//     console.error(error);
//   }
// }



// useEffect(()=>{
//   getUser();
// },[])
//   return (
//     <Box sx={{border:'1px solid black', backgroundColor:'red'}}>
// <form className="login">
//   {/* <Typography>{user}</Typography> */}
//         <Avatar {...stringAvatar(user)}/>
//         <Menu
//         id="user-menu"
//         anchorEl={anchorEl}
//         keepMounted
//         open={!!anchorEl}
//         onClose={handleClose}
//       >
//         <MenuItem onClick={signOut}>Sign Out</MenuItem>
//       </Menu>
      
//         </form>
//     </Box>
      
//   )
// }
