const express = require('express');
const passport = require("passport");
const mongoose = require("mongoose");
const {User, Todo} = require("../model/models");

const app = express();


app.get("/api", (req, res) => {
    //console.log(req.user)

    if (req.isAuthenticated()) {
        res.json({
            message: `You are logged in`,
            name: req.user.username,
            picture: req.user.picture,
            isLoggedin: true
        })
    } else {
        res.json({
            message: "You are not logged in",
            isLoggedin: false
        })
    }

})

app.get("/api/logout", (req, res) => {
    req.logOut((err) => {
        if (!err){
        res.redirect("http://localhost:3000/");
    }
    else {
        res.redirect("http://localhost:3000/");
    }
    });

})

app.get('/api/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

app.get("/api/success", (req, res) => {
    if (req.isAuthenticated()) { 
        User.findOne({
                    googleId: req.user.googleId
                }, (err, user) => {
                    if (err) {
                        res.status(401).send(err)
                    } else {
                        res.status(200).json({
                            user:user,
                            isLoggedin: true
                        })
                    }
                })
    }
    else{res.json({
        message: "User is not logged in",
        isLoggedin: false
    })}














})

app.get("/api/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "login is failed. Try again!"
    })
})

app.get('/api/auth/google/secrets',
    passport.authenticate('google', {
        successRedirect:"http://localhost:3000/",
        failureRedirect: '/api/failed'
    }));

app.route('/api/todos')
    .get((req, res) => {
        if (req.isAuthenticated()) { 
            User.findOne({
                        googleId: req.user.googleId
                    }, (err, user) => {
                        if (err) {
                            res.status(401).send(err)
                        } else {
                            res.status(200).json({
                                todos: user.todos,
                                isLoggedin: true
                            })
                        }
                    })
        }
        else{res.json({
            message: "User is not logged in",
            isLoggedin: false
        })}
    })
    .post((req, res) => {

        if (req.isAuthenticated()) { 
            User.findOneAndUpdate({googleId: req.user.googleId},{$inc : {todocount : 1}},(err,user)=>{
                if (err) {
                    console.log(err)
                    res.json({message:"err"})
                } else {     
                    //console.log(user);           
                        let newTodo = new Todo({
                            text: req.body.todo,
                            date: new Date()
                        })
                    //user.todocount+=1;
                    user.todos.push(newTodo)
                    user.save();
                    //res.redirect('/api/todos')
                }
            })
            res.status(200).json({
                message: "User is logged in"
            })
            
       }
        else{res.status(401).json({
            message: "User is not logged in"
        })}

    })
    .delete((req, res)=>{
        if (req.isAuthenticated()) { 
            console.log(req.body.id)
        //res.status(200).json({message:"Delete Successful"+ req.body.id})
        User.findOneAndUpdate({googleId: req.user.googleId}, { $pull: {todos:{_id: req.body.id} }}, (err,todos)=>{
                        if (err){console.log(err);}
                        else{res.status(200).json({
                            message: "todo is deleted."
                        })}
                    })
        }
        else{res.status(401).json({
                    message: "User is not logged in"
                })}
    })
    .put((req,res)=>{
        if (req.isAuthenticated()) {
            console.log(req.body.id)
            User.updateOne({
                "todos": { "$elemMatch": { "_id": req.body.id }}
            },{
                "$set": { "todos.$.complete": true }
            },(err,user)=>{
                if(err){
                    res.status(401).json({message:err})
                }
                else{
                    res.status(200).json({message:"user have completed task"})
                }
            })
        }
    })

    app.route('/api/pomodo')
    .get((req,res)=>{
        if (req.isAuthenticated()) { 
            res.status(200).json({isLoggedi:true, starttime:req.user.pomodostarttime , timenow:req.user.pomodotimenow, pomodocompleted:req.user.totalpomodorocomplete})
        }
        else {
            res.status(401).json({isLoggedi:false, message: "you are not logged in"})
        }
    })
    .put((req,res)=>{
        if (req.isAuthenticated()) { 
            User.findOneAndUpdate({googleId: req.user.googleId}, {pomodostarttime: req.body.time}, (err,user)=>{
                if(!err){
                    res.status(200).json(user) 
                }
                else(
                    res.status(401).json({message: err}) 
                )
            })
        }
        else {
            res.status(401).json({isLoggedi:false, message: "you are not logged in"})
        }
    })
    .patch((req,res)=>{
        if (req.isAuthenticated()) { 
            User.findOneAndUpdate({googleId: req.user.googleId}, {pomodotimenow: req.body.time}, (err,user)=>{
                if(!err){
                    res.status(200).json(user) 
                }
                else(
                    res.status(401).json({message: err}) 
                )
            })
        }
        else {
            res.status(401).json({isLoggedi:false, message: "you are not logged in"})
        }
    })







    
module.exports = app;