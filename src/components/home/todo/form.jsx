import React from 'react'
import "./todo.css"
import { Paper, InputBase, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from "axios"



export default function Form({ input, setInput, dbtodos }) {


  const handleChange = (event) => {
    setInput(event.target.value);
  };
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(input);
    await axios.post(`http://localhost:8080/api/todos`,{todo:input},
    {withCredentials: true})
    .then(function (response) {
      console.log(response);
      
    })
    .catch(function (error) {
      console.log(error);
    });

 
    setInput('');

    
  };

  let blankHandler = (e)=>{
e.preventDefault();
  }


  let placeholder = (dbtodos.length === 5) ? "Finish this 5 tasks first. Then add new tasks. :D" : "What are you going to do today?";
  let readOnly = (dbtodos.length === 5) ? true : false;



  return (
    <form onSubmit={(dbtodos.length === 5)? blankHandler: handleSubmit }>
      <Paper 
      elevation={5}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: {
            xs:240,
          sm: 240,
          md:380,
          lg:400,
          xl:400,
          xxl:400
          },
          boxShadow: '1px 1px 10px -1px #1976d2, 0px -1px 0px 0px #1976d2, 10px 5px 10px -1px #1976d2',
          borderRadius: '50px',
          
        }}>

        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={handleChange}
          value={input}
          required
        />
        <IconButton
          type="submit"
          sx={{
            p: "5px",
            color: '#1976d2'
          }}
          aria-label="add"
        >
          <AddIcon />
        </IconButton>

      </Paper>
    </form>
  )
}
