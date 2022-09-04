
const express = require("express");
const passport = require("passport");
const app = express();
const localStrategy = require("passport-local").Strategy;
const { User } = require("../model/models");


passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });