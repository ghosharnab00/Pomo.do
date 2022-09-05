require('dotenv').config();
const express = require("express"),
  app = express(),
  authRoute = require('./routes/authRoute'),
  localRoute = require('./routes/localRoutes'),
  auth = require('./middleware/auth.js')(),
  mongoose = require("mongoose"),
  session = require('express-session'),
  cors = require('cors');


mongoose.connect(`mongodb+srv://${process.env.MONGODB_UID}:${process.env.MONGODB_PASS}@cluster0.akq99.mongodb.net/pomodoDB`, {useNewUrlParser: true});

app.use(cors({
  'origin': 'https://pomo.arnabghosh.me',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));


var expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
var sess = {
    secret: process.env.COOKIE_SECRET,
    cookie: { 
      sameSite:"none",
      secure:true,
      httpOnly:false,
      maxAge:expiryDate
    },
    resave: true,
    saveUninitialized: true,
    sameSite: "none",
  }
  
  app.set('trust proxy', 1)
  
app.use(session(sess))


app.use(auth.initialize());
require('./strategies/localStrategy')


app.use("/api",authRoute);
app.use("/api",localRoute);



app.listen(3000, function() {
  console.log("App started on port 3000")
});

// // Export the app object. When executing the application local this does nothing. However,
// // to port it to AWS Lambda we will create a wrapper around that will load the app from
// // this file
module.exports = app

