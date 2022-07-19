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

const pomodoSchema = new mongoose.Schema({
    starttime: Date,
    endtime: Date,
})
const userSchema = new mongoose.Schema({
    username: String,
    googleId: String,
    picture: String,
    todocount: Number,
    todos: [todoSchema],
    pomodo: [pomodoSchema],
    totalpomodorocomplete: Number,
})

userSchema.plugin(findOrCreate)

const User = mongoose.model('user',userSchema )
const Todo = mongoose.model('todo', todoSchema )

module.exports = {User, Todo};