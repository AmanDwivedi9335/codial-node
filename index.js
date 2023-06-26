const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require ('./config/mongoose')
 // Assuming your router file is named 

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore =  require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views')

//mongo store is used to store the session cookie in db

app.use(session({
    name : 'users-cookie',
    secret: 'blah blah',
    resave: false,
    cookie : {
        maxAge: (1000*60*100)
    },
    store : new MongoStore({
        mongooseConnection : db,
        autoRemove : 'disabled'
        , 
        function(err){
            console.log((err) || 'you have done wrong mongostore');
        }
    })
}));


const router = require('./routers/index'); // Change './router' to the actual path of your router file


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', router);   // Mount the router middleware

app.listen(port , function(err){
    if (err){
        console.log('Error: ', err);
    }
    console.log('Server is running on port: ', port);
});