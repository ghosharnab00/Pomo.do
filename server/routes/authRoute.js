const { User } = require('../model/models');
const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controller/authController')

router.post("/login", passport.authenticate('local'),  authController.login)
router.post("/register", authController.register,passport.authenticate('local'),  authController.login)
router.get("/logout", authController.logout)

module.exports = router


