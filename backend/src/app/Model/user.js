const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//DB user
const User= new Schema({
    username: {type: String,require: true,min: 6,max: 20,unique: true,},
      email: {type: String,require: true, max: 50,unique: true,},
      password: {type: String,require: true,min: 6,},
      admin: {type: Boolean,default: false,},
    // email: {
    //     type: String,
    //     required: true,
    //     unique: true,
    //     match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    // },
    // password: {
    //     type: String,
    //     required: true
    // },
    // role: {
    //     type: Number,
    //     required: true
    // }    
},{
  timestamps: true,
});

module.exports = mongoose.model('User', User);