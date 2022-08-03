const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  name: String,
  password:String,

});

const Account = mongoose.model('accounts',  accountSchema);

module.exports =  Account;