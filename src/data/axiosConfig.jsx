

import axios from "axios";

console.log(process.env.API)
export const api = 'https://bwop6isy8k.execute-api.ap-south-1.amazonaws.com/dev/api'
// export const api = 'http://localhost:3000/api'

const client = axios.create({baseURL:api})

const token = (typeof(localStorage.isLoggedIn)===undefined || localStorage.isLoggedIn==="") ? "": JSON.parse(localStorage.getItem('access_token'));


 
 export const axiosconfig = {
    headers: { Authorization: `Bearer ${token}`
  }
 }

 export const request = ({...options}) => {
    client.defaults.headers.common.Authorization= `Bearer ${token}`
    const onSuccess = response =>response;
    const onError = error=>{return error}

    return client(options).then(onSuccess).catch(onError)
  }

 
