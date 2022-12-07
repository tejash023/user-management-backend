const express = require('express');
const app = express();
const port = process.env.PORT || '8080';


//starting the server
app.listen(port, function(err){
  if(err){
    console.log('Error starting in server', err.message);
  }

  console.log(`Server is successfully running at ${port}`);
})