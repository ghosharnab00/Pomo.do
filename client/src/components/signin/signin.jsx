import React, { useEffect, useState } from 'react'
import {Button, Avatar, Menu, MenuItem} from "@mui/material"
import axios from "axios"
import "./signin.css"

export default function Signin() {
let [user, setUser]= useState({googleId: null,
picture: null,
username: null});
const [anchorEl, setAnchorEl] = useState(null)

let googleAuth = async(event)=>{
window.open("http://localhost:8080/api/auth/google","_self")

}

let signOut = async(e)=>{
  window.open("http://localhost:8080/api/logout/","_self")
  setUser({googleId: null,
    picture: null,
    username: null})
}

const handleClose = () => {
  setAnchorEl(null)
}

const openMenu = (event) => {
  console.log(event.currentTarget)
  setAnchorEl(event.currentTarget)
}

async function getUser() {
  try {
    await axios.get("http://localhost:8080/api/success",{
      method:"GET",
      withCredentials: true,
    }).then((dataa)=>{
      //console.log(dataa)
      setUser({googleId: dataa.data.user.googleId,
        picture: dataa.data.user.picture,
        username: dataa.data.user.username})
      })
    
    ;
    //console.log(user)
  } catch (error) {
    console.error(error);
  }
}



useEffect(()=>{
  getUser();
  console.log(user);
},[])
  return (
    
      <form className="login">
        {user.username ? 
        (<><Avatar alt={user.username} src={user.picture} onClick={openMenu}/>
        <Menu
        id="user-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={signOut}>Sign Out</MenuItem>
      </Menu>
      </>
          
          )
        : <Button variant="outlined" style={{ color: "var(--color3)50", borderColor: "var(--color3)50" }} onClick={async(event)=>{googleAuth(); event.preventDefault();}}>Sign In</Button>}
        
        </form>
  )
}
