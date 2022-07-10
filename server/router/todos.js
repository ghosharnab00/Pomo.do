const express = require('express');
const mongoose = require("mongoose");
const { User, Todo } = require('../model/models');
const Auth = require("./auth")


const app = express();

app.route('/api/todos')
.get((req,res)=>{
    console.log(req.user)
    if (req.isAuthenticated()){
        User.findOne({userid:"123"})
res.json({message: "User is logged in"})
    }
   

    res.json("todos")
})
.post((req,res)=>{
    console.log(req.user)
})

module.exports = app;