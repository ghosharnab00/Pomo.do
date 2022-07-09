import React, { useEffect, useState } from 'react'
import {Button} from "@mui/material"
import "./signin.css"

export default function Signin() {
let [name, setname]= useState("");
let [profileimage, setProfileimage]= useState("");
let [isLoggedin, setisLiggedin] = useState("")

let googleAuth = async(event)=>{
window.open("http://localhost:8080/api/auth/google","_self")

}

// let getUser = async()=>{
//   await fetch('http://localhost:8080/api/',
//   { method: "GET",
//   headers: {
//     'Access-Control-Allow-Origin': '*','Content-Type': 'application/json'
//   },
//     //body: JSON.stringify({name,profileimage,isLoggedin}),
//     //credentials: "same-origin", //include, same-origin
// })
//   .then(response => response.json())
//   .then(data => console.log(data));
// }

useEffect(()=>{
  // getUser();
},[])
  return (
      <form className="login">
        <Button variant="outlined" style={{ color: "var(--color3)50", borderColor: "var(--color3)50" }} onClick={async(event)=>{googleAuth(); event.preventDefault();}}>Sign In</Button>
        </form>
  )
}
