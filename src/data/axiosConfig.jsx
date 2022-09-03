// export const api = 'https://bwop6isy8k.execute-api.ap-south-1.amazonaws.com/dev/api'
// export const api = 'https://pomo-do.herokuapp.com/api'
export const api = 'http://localhost:3000/api'

const token = JSON.parse(localStorage.getItem('access_token'));
 export const axiosconfig = {
    headers: { Authorization: `Bearer ${token}`
  }
 }
