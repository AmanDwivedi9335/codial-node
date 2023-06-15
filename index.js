const express = require('express');
const app = express();
const port = 8000;

const router = require('./routers/index'); // Assuming your router file is named 

app.use('/', router); // Mount the router middleware

app.listen(port , function(err){
    if (err){
        console.log('Error: ', err);
    }
    console.log('Server is running on port: ', port);
});