const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate');
const passportLocalMongoose = require('passport-local-mongoose');

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
    todocount: Number,
    todocompleted:Number,
    todos: [todoSchema],
    pomodos: [pomodoSchema],
    totalpomodorocomplete: Number,
})

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model('user',userSchema )
const Todo = mongoose.model('todo', todoSchema )
const Pomodo = mongoose.model("pomodo", pomodoSchema )

module.exports = {User, Todo, Pomodo};