const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate')
const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    picture: String
})

userSchema.plugin(findOrCreate)

const User = mongoose.model('User',userSchema )

module.exports = {User};