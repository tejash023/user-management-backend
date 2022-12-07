const mongoose = require('mongoose');

//defining user schema
const userSchema = mongoose.Schema({

  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }

},{
  timestamps: true
});

//creating User Model
const User = mongoose.model('User', userSchema);

//exporting user
module.exports = User;