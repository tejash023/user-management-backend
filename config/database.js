const mongoose = require('mongoose');

// DB CONNECTION
mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

// Validate if error in connection
db.on('error', console.error.bind('Error connecting to the DB'));

// validate if successfull connection
db.once('open', () =>{
  console.log('Successfully connected to the DB');                       
})