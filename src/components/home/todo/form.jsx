import React from 'react'
import "./todo.css"
import { Paper, InputBase, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import axios from "axios";
import { request } from '../../../data/axiosConfig'



export default function Form({ input, setInput, dbtodos }) {


  const handleChange = (event) => {
    setInput(event.target.value);
  };
  
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log(input);
    await request({
      url:`/todos?todo=${input}`,
      method:'post'
    })
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
          boxShadow: '1px 1px 10px -1px #0000FF, 0px -1px 0px 0px #0000FF, 10px 5px 10px -1px #0000FF',
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
            color: 'primary'
          }}
          aria-label="add"
        >
          <AddIcon />
        </IconButton>

      </Paper>
    </form>
  )
}
