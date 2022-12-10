require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || '8080';
const db = require('./config/database');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

app.use(express.urlencoded({extended: false}));

// USER ROUTE
app.use('/', require('./routes'));

// STARTING SERVER
app.listen(port, function(err){
  if(err){
    console.log('Error starting in server', err.message);
  }

  console.log(`Server is successfully running at ${port}`);
})