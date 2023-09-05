const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require ('./config/mongoose');
const flash = require('connect-flash');
const mWare = require('./config/middleware');

//var sassMiddleware = require('node-sass-middleware');
 // Assuming your router file is named 

// app.use(sassMiddleware({
//     src: './assets/scss', 
//     dest: './assets/css', 
//     debug: true,  
//     outputStyle: 'extended',  //DNU
//     prefix: '/css'  
// }));

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-strategy-jwt');
const MongoStore =  require('connect-mongo')(session);

const passportGoogle = require('./config/passport-google-oauth2-strategy');

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets')); //new line added
//make the upload path available to browser
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(expressLayouts);
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

app.use(flash());
app.use(mWare.setFlash);

app.use('/', router);   // Mount the router middleware

app.listen(port , function(err){
    if (err){
        console.log('Error: ', err);
    }
    console.log('Server is running on port: ', port);
});