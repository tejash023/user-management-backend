//ENV FILES
require('dotenv').config();

//EXPRESS
const express = require('express');
const app = express();

//PORT
const port = process.env.PORT || '8080';

//DB
const db = require('./config/database');

//PASSPORT
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

//SWAGGER
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(express.urlencoded({extended: false}));

//INDEX PAGE
app.get('/', (req, res) => {
  res.send('<div style = "font-family: Arial, Helvetica, sans-serif;display: flex; flex-direction:column; gap:2rem;align-items:center; justify-content:center; color:orangered; padding: 30px"><h1 style="font-size: 3rem">👮 User Management API</h1><a href="/api-docs" style = "background: orangered; padding: 10px 20px; color:white; text-decoration:none; font-size:1rem; cursor:pointer; border-radius:5px" href="/api-docs"><p style="font-size: 2rem; margin:0">Documentation 📄</p></div>')
});
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// USER ROUTE
app.use('/', require('./routes'));

// STARTING SERVER
app.listen(port, function(err){
  if(err){
    console.log('Error starting in server', err.message);
  }

  console.log(`Server is successfully running at ${port}`);
})