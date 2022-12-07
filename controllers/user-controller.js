//importing user
const User = require('../models/user');

//register the user
module.exports.registerUser = async (req, res) => {
  
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
    await User.create(req.body);
    return res.status(200).json({
      message: 'User registered successfully'
    });
  }else{
    return res.status(422).json({
      message: 'email already exists'
    });
  }
}