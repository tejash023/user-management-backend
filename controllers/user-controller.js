//importing user
const User = require('../models/user');
// const JwtStrategy = require('passport-jwt/lib/strategy');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const encryption = require('../config/encryption');


//register the user
module.exports.registerUser = async (req, res) => {

  //accepts userName, userEmail, userPhone, password and confirm password.
  //passowrd is stored in hashed format

  try{

    //validate if password and confirm password matches
    if(req.body.password != req.body.confirm_password){
      return res.status(401).json({
        message: 'Passwords do not match. Please try again'
      });
    }

    //if passwords match - check if the user is already registered
    let user = await User.findOne({email:req.body.email});

    //if user does not exist - create the user else redirect back to register page
    if(!user){
      //encryping the user details before storing it into the database
      const encryptedUser = {
        name: encryption.encryptData(req.body.name),
        email: await req.body.email,
        phone: encryption.encryptData(req.body.phone),
        password: await bcrypt.hash(req.body.password, 10),
      }
  
      await User.create(encryptedUser);
      return res.status(200).json({
        message: 'User registered successfully'
      });
    }else{
      //if user exists
      return res.status(422).json({
        message: 'email already exists'
      });
    }

  }catch(err){
    if(err){
      console.log('registerUser:', err.message);
      return res.status(422).json({
        message: 'Internal Server Error. Please try again!!'
      })
    }
  }
  
  
}

//fetch all user 
module.exports.getAllUsers = async (req, res) => {
  try{
    let users = await User.find({});
    var decryptedUser = [];
    for(i in users){
      //console.log('user', users[i].name);
      const user = {
        name: encryption.decryptData(users[i].name),
        email: users[i].email,
        phone: encryption.decryptData(users[i].phone)
      }

      decryptedUser.push(user);
    }
    
    return res.status(200).json({
      message:'All registered users',
      users: decryptedUser
    });

  }catch(err){
    if(err){
      console.log(err.message);
      return res.status(422).json({
        message: `OOPs some error occurred - ${err.message}`
      });
    }
  }
  
}

//user login
module.exports.createSession = async (req, res) => {

  //accepts user email and password - upon login will generate a json web token valid for 5 mins

  try{

    //find user using email - if user exists
    
    let user = await User.findOne({ email: req.body.email});
    

    //if user doesnot exists
    if(!user){
      return res.status(422).json({
        message:'User does not exists'
      })
    }

    //check if password is valid
    //console.log(await bcrypt.compare(req.body.password, user.password));
    if(await bcrypt.compare(req.body.password, user.password)){
      return res.status(200).json({
        message:'Sign in successfull',
        data:{
          token: jwt.sign(user.toJSON(), 'faj42hrj2fejoihe2i3', {expiresIn: '500000'})
        }
      });
    //return if invalid purpose
    }else{
      return res.status(422).json({
        message:'Incorrect username / password'
      })
    }

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      message:'Internal server error'
    });
  }
}


//reset password
module.exports.resetPassword = async (req, res) => {
  
  //accepts email, old password, new password and confirm password
  try{
    if(req.body.new_password == req.body.confirm_password){

      //check if password is valid
      if(await bcrypt.compare(req.body.password, req.user.password)){
        const hash = await bcrypt.hash(req.body.new_password, 10);
        await User.updateOne(
          { _id: req.user._id },
          { $set: { password: hash } },
          { new: true }
        );
        return res.status(200).json({
          message:'Password updated successfully',
        });

      //return if invalid password
      }else{
        return res.status(422).json({
          message:'Incorrect email/password'
        })
      }

    }else{
      return res.status(422).json({
        message: 'new and confirm password doesn\'t match'
      })
    }
  }catch(err){
    console.log(err.message);
    return res.status(422).json({
      message:'Internal server error'
    })

  }


}


//update user details
module.exports.updateUser = async (req, res) => {

  //accepts user name and user phone no and updates them.

  if(req.user){
    try{

      let user = await User.findOne({email: req.user.email});

      user.name = encryption.encryptData(req.body.name);
      user.phone = encryption.encryptData(req.body.phone);

      user.save();

      return res.status(200).json({
        message: 'User details updated successfully'
      })


    }catch(err){
      console.log('Error:', err.message);
      return res.status(422).json({
        message: 'Internal Server Error'
      })
    }
  }
  
}