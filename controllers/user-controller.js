//importing user
const User = require('../models/user');
const encryption = require('../config/encryption');

//register the user
module.exports.registerUser = async (req, res) => {

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
      //const encryptedUser = encryption.encryptData(req.body);
      const encryptedUser = {
        name: encryption.encryptData(req.body.name),
        email: encryption.encryptData(req.body.email),
        phone: encryption.encryptData(req.body.phone),
        password: encryption.encryptData(req.body.password),
      }
      console.log(encryptedUser);
      await User.create(encryptedUser);
      return res.status(200).json({
        message: 'User registered successfully'
      });
    }else{
      return res.status(422).json({
        message: 'email already exists'
      });
    }

  }catch(err){
    if(err){
      console.log(err.message);
      return res.status(422).json({
        message: 'Internal Server Error. Please try again!!'
      })
    }
  }
  
  
}