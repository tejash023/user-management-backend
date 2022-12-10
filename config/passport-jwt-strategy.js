const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
  jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET

}

passport.use(new JWTStrategy(opts, function(jwtpayload, done){

  User.findById(jwtpayload._id, function(err, user){
    if(err){
      console.log("error in finding user ---- JWT:", err.message);
      return;
    }

    if(user){
      return done(null, user);
    }else{
      return done(null, false);
    }
  })
}))

module.exports = passport;
