const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, max: 80},
    password: {type:String, required: true, max: 80},
    name: {type: String, required: true},
    address: {type:String },
    age: {type: Number},
    phoneNumber: {type: String},
    picture: {type: String }
})

const UserModel = mongoose.model('users', UserSchema)

module.exports = UserModel