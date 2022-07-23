require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser');
const passport = require("passport")
var session = require('express-session')
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const mongoose = require("mongoose");
const {User} = require("./model/models")
const Auth = require("./router/auth")
const cors = require("cors")
const port = process.env.PORT || 8080
const app = express();

app.use(express.json())
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '');
//   next();
// });
mongoose.connect("mongodb://localhost:27017/pomodoDB", {useNewUrlParser: true});

//Cookies setup
var sess = {
    secret: 'gorugadha.com',
    cookie: {},
    resave: true,
    saveUninitialized: true
  }
  
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sess.cookie.secure = true // serve secure cookies
  }
  
app.use(session(sess))


//passport google auth setup
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  'origin': 'http://localhost:3000',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

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
   
    User.findOrCreate({ googleId: profile.id, username:profile.displayName, picture: profile.picture /*todocount:0*/ }, function (err, user) {
      return cb(err, user);
    });
  }
));


//mongoose setup




app.use(bodyParser.json())
app.use(Auth);
// app.use(Todos);



app.listen(port,()=>{console.log("server started at: "+port)})