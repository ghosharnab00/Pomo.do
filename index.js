require('dotenv').config()

const express = require('express')
const passport = require("passport")
var session = require('express-session')
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require("mongoose");
const {User} = require("./server/model/models")
const Router = require("./server/router/auth")
const cors = require("cors")
const port = process.env.PORT || 8080
const app = express();
app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
mongoose.connect("mongodb://localhost:27017/pomodoDB", {useNewUrlParser: true});

//Cookies setup
var sess = {
    secret: 'gorugadha.com',
    cookie: {},
    saveUninitialized: false,
    resave:false
  }
  
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  
app.use(session(sess))

//passport google auth setup
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
        done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/api/auth/google/secrets",
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
  },
  function(accessToken, refreshToken, profile, cb) {
   //console.log(profile)
    User.findOrCreate({ googleId: profile.id, username:profile.displayName, picture: profile.picture }, function (err, user) {
      //console.log(user);
      return cb(err, user);
    });
  }
));


//mongoose setup





app.use(Router);


app.listen(port,()=>{console.log("server started at: "+port)})