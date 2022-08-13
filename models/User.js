const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  email: String,
  password:String,
  loginAttempts: {
    type:Number,
    default:0
  },
  startTime: {
    type:Number,
    default:Date.now()
    }

});

const User = mongoose.model('users', userSchema);

module.exports =  User;