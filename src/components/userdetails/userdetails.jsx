import React, { useEffect, useState, useContext } from 'react'
import {Avatar, Menu, MenuItem} from "@mui/material"
import SettingContext from '../settings/settingcontext'
import axios from "axios"
import "./userdetails.css"
import { api } from '../../data/axiosConfig'

export default function Signin() {
  const settingcontext = useContext(SettingContext);
let [user, setUser]= useState({googleId: null,
picture: null,
username: null});
const [anchorEl, setAnchorEl] = useState(null)



let signOut = async(e)=>{
  window.open(api+"/logout","_self")
  setUser({googleId: null,
    picture: null,
    username: null})
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
    await axios.get(api+"/success",{
      method:"GET",
      withCredentials: true,
    }).then((dataa)=>{
      console.log(dataa.data)
      setUser({googleId: dataa.data.user.googleId,
        picture: dataa.data.user.picture,
        username: dataa.data.user.username})

        if (dataa.data.isLoggedin){
          settingcontext.setIssignedin(true)
          settingcontext.setStarttime(dataa.data.user.pomodostarttime);
        }
        else{
          settingcontext.setIssignedin(false)
        }
      })
      // settingcontext.setIssignedin(true)
    //console.log(user)
  } catch (error) {
    console.error(error);
  }
}



useEffect(()=>{
  getUser();
},[])
  return (
    
      <form className="login">
        <Avatar alt={user.username} src={user.picture} onClick={openMenu}/>
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
