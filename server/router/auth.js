const express = require('express');
const passport = require("passport");
const mongoose = require("mongoose");
const { User } = require('../model/models');

const app = express();


app.get("/api", (req, res) => {
    console.log(req.user)

    if(req.isAuthenticated()){
        res.json({message: `You are logged in`,name: req.user.username, picture: req.user.picture ,isLoggedin: true})
    }
    else{
        res.json({message: "You are not logged in", isLoggedin: false})
    }
    
})

app.get("/api/logout", (req, res) => {
    req.logOut(()=>{
        res.redirect("http://localhost:3000/");
    });
    
})

app.get('/api/auth/google',
    passport.authenticate('google', {
            scope:['profile']
        }
    ));

app.get("/api/success",(req,res)=>{
    if(req.user){
        res.status(200).json({ error:false, message: `You are logged in`,user:req.user })
    }
    else{
        res.status(403).json({error:true, message: "Not Authorized"})

    }
})

app.get("/api/failed",(req,res)=>{
    res.status(401).json({error: true ,message: "login is failed. Try again!"})
})

app.get('/api/auth/google/secrets',
passport.authenticate('google', { successRedirect:"http://localhost:3000/", failureRedirect: '/api/failed' }));  


app.route('/api/todos')
.get((req,res)=>{
    console.log(req.user)
    if (req.isAuthenticated()){
        User.findOne({userid:"123"})
res.json({message: "User is logged in"})
    }
    else{
        res.json({message: "User is not logged in"})

    }
})

module.exports = app;