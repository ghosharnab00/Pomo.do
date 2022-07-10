const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate')

const todoSchema = new mongoose.Schema({
    todo: {
        type: String,
        required: true
    },
    date: Date,
    todocount: Number
})

// const pomodoSchema = new mongoose.Schema({

// })
const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    picture: String,
    todos: [todoSchema]
   //pomodo: [pomodoSchema]
})

userSchema.plugin(findOrCreate)

const User = mongoose.model('User',userSchema )
const Todo = mongoose.model('Todo', todoSchema )

module.exports = {User, Todo};