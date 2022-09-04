const express = require("express"),
    {User} = require("../model/models"),
    config = require("../config.js"),
    passport = require('passport'),
    jwt = require("jwt-simple");

    
exports.login = (req, res) => {

    User.findOne({ username: req.query.username }, (err, user) => {
       
      if (err) {
        res.status(200).json({err:err})
      } else {
        var payload = {
          id: user.id,
          pass: req.query.password,
          expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
        };
        var token = jwt.encode(payload, config.jwtSecret);
        res.status(200).json({token:token})
      }
    });
}
  
    


exports.register = (req, res, next) => {
    
    User.findOne({ username: req.query.username }, (err, user) => {
        if (err) {
            res.status(200).json({err:err})
          }
          else{
            if(user===null){
                User.register(
                    new User({
                        username: req.query.username,
                    }),
                    req.query.password,
                    function (err, user) {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            next()
                        }
                    })
            }
            else{
                User.findOne({ username: req.query.username }, (err, user) => {
                    if (err) {
                      res.status(200).json({err:err})
                    } else {
                      
                      var payload = {
                        id: user.id,
                        pass: req.query.password,
                        expire: Date.now() + 1000 * 60 * 60 * 24 * 7, //7 days
                      };
                      var token = jwt.encode(payload, config.jwtSecret);
                      // res.cookie('access_token', token, { httpOnly: true , path:'/'});
                      res.status(200).json({token:token})
                    }
                  });
            }
          }
    })
}

exports.logout = (req,res, next)=>{
  res.cookie('access_token', "", { httpOnly: true , maxAge: 1});
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/api/success');
  });

}
