//importing user
const User = require('../models/user');
const encryption = require('../config/encryption');
const JwtStrategy = require('passport-jwt/lib/strategy');

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
      //encryping the req.body before storing it into the database
      const encryptedUser = {
        name: encryption.encryptData(req.body.name),
        email: encryption.encryptData(req.body.email),
        phone: encryption.encryptData(req.body.phone),
        password: encryption.encryptData(req.body.password),
      }
      //console.log(encryptedUser);
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
        email: encryption.decryptData(users[i].email),
        phone: encryption.decryptData(users[i].phone),
        password: encryption.decryptData(users[i].password)
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

//login user
module.exports.createSession = (req, res) => {

  try{

    //find user using email - if user exists
    let user = await User.findOne({email: encryption.encryptData(req.body.email)});

    //if user doesnot exists / passwords does not match
    if(!user || user.password !== encryption.encryptData(req.body.password)){
      return res.status(422).json({
        message:'Invalid username or password'
      })
    }

    //if user exists and password match - login and generate jwt token
    return res.status(200).json({
      message:'Sign in successfull',
      data:{
        token: jwt.sign(doctor.toJSON(), '', {expiresIn: '500000'})
      }
    });

  }catch(err){
    console.log(err.message);
    return res.status(500).json({
      message:'Internal server error'
    });
  }
}