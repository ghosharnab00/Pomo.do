const express = require("express"),
    { User,
        Todo,
        Pomodo } = require("../model/models"),
    config = require("../config.js"),
    passport = require('passport'),
    jwt = require("jwt-simple");


    exports.getUser = (req, res) => {

        User.findOne({
                        _id: req.user._id
                    }, (err, user) => {
                        
                        if (err) {
                            res.status(401).send(err)
                        } else {
                            res.status(200).json({
                                username: user.username,
                                isLoggedin: true
                            })
                        }
                    })
       
    }

    exports.getTodos=(req,res)=>{
        
        User.findOne({
            _id: req.user._id
                        }, (err, user) => {
                            if (err) {
                                res.status(401).send(err)
                            } else {
                                // let todocompleted = 0;
                                // user.todos.forEach(todo=>{
                                //     if(todo.complete === true){
                                //         todocompleted += 1;
                                //     }
                                // })
                                res.status(200).json({
                                    todos: user.todos,
                                    isLoggedin: true,
                                    todocount: user.todocount,
                                    todocompleted: user.todocompleted
                                    
                                })
                            }
                        })
    }
exports.postTodos=(req,res)=>{
    
    User.findOneAndUpdate({
        _id: req.user._id
                    }, {
                        $inc: {
                            todocount: 1
                        }
                    }, (err, user) => {
                        if (err) {
                            
                            res.json({
                                err:err
                            })
                        } else {
                            //console.log(user);           
                            let newTodo = new Todo({
                                text: req.query.todo,
                                date: new Date()
                            })
                            //user.todocount+=1;
                            user.todos.push(newTodo)
                            user.save();
                            //res.redirect('/api/todos')
                        }
                    })
                    res.status(200).json({
                        message: "Added new todo",

                    })
}

exports.CompleteTask=(req,res)=>{
    // console.log(req.query)
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $inc: {
            todocompleted: 1
        }
    },(err)=>{
        if(!err){
            User.updateOne({
                "todos": {
                    "$elemMatch": {
                        "_id": req.query.id
                    }
                }
            }, {
                "$set": {
                    "todos.$.complete": true
                }
            }, (err, user) => {
                if (err) {
                    res.status(401).json({
                        message: err
                    })
                } else {
                    
                    res.status(200).json({
                        message: "user have completed task"
                    })
                }
            })
        }
    })
    
}

exports.deleteTodos=(req,res)=>{
    
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $pull: {
            todos: {
                _id: req.query.id
            }
        }
    }, (err, todos) => {
        if (err) {
            res.status(401).json({
                err: err
            })
        } else {
            res.status(200).json({
                message: "todo is deleted."
            })
        }
    })
}

exports.getPomodo=(req,res)=>{
    User.findOne({
        _id: req.user._id
    }, (err, user) => {
        if (!err) {
            let totaltime=0;
            user.pomodos.forEach(user=>{
                let time = (new Date(user.endtime).getTime() - new Date(user.starttime).getTime());
                totaltime+=time;
                
            })
            res.status(200).json({isLoggedin:true, pomodotime: totaltime, pomodocount:user.totalpomodorocomplete})

        } else {
            res.status(401).json({
                message: err
            })
        }
    })
}



exports.postPomodo=(req,res)=>{
    User.findOne({
        _id: req.user._id
    }, (err, user) => {
        if (err) {
            console.log(err)
            res.json({
                message: err
            })
        } else {
                      
            let newPomodo = new Pomodo({
                starttime: req.query.starttime,
                endtime: req.query.endtime
            })
            user.pomodos.push(newPomodo)
            user.save();
            
        }
    })
    res.status(200).json({
        message: "User is logged in"
    })
}


exports.increamentPomodo=(req,res)=>{
    User.findOneAndUpdate({
        _id: req.user._id
    }, {
        $inc: {
            totalpomodorocomplete: 1
        }
    },(err,user)=>{
        if(!err){
            res.status(200).json({
                user: user
            })
        }
        
    })
}

exports.logout = (req,res, next)=>{
    // res.cookie('access_token', "", { httpOnly: true , maxAge: 1});
    req.logout(function(err) {
      if (err) { return next(err); }
    });
  
  }