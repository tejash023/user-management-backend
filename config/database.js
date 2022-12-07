const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user-management-dev');

const db = mongoose.connection;

db.on('error', console.error.bind('Error connecting to the DB'));

db.once('open', () =>{
  console.log('Successfully connected to the DB');                       
})