const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate')

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    complete: { type: Boolean, default: false },
    date: Date
})

// const pomodoSchema = new mongoose.Schema({
    
// })
const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    picture: String,
    todocount: Number,
    todos: [todoSchema],
    pomodostarttime: Date,
    pomodotimenow: Date,
    totalpomodorocomplete: Number,
})

userSchema.plugin(findOrCreate)

const User = mongoose.model('User',userSchema )
const Todo = mongoose.model('Todo', todoSchema )

module.exports = {User, Todo};