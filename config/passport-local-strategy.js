// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user');

// passport.use(new LocalStrategy({
//     usernameField : 'email'
//     },
//     function(email, password, done){
//         User.findOne({email:email}, function(err,user){
//             if(err){
//                 console.log('Error in finding user ---> Passport');
//                 return done(err);
//             }
//             if(!user || user.password != password){
//                 console.log('Invalid Username / Password');
//                 return done(null, false);
//             }
//             return done(null, user);
//         });
//     }
// ));


// //serilazing user
// passport.serializeUser(function(user, done){
//     done(null, user.id);
// })

// //deserializing user
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
//         if(err){
//             console.log('Error in finding user ---> Passport');
//             return done(err);
//         }

//         return done(null, user);

//     });
// });

// //check if the user is authenticated
// passport.checkAuthentication = function(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }

//     return res.redirect('/users/signIn');

// }

// passport.setAuthenticatedUser = function (req, res, next){
//     if(req.isAuthenticated()){
//         res.locals.user = req.user;
//     }
//     next();
// }

// module.exports = passport;

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },function(email,password,done){
        //find a user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err) return done(err);
            if(!user || user.password != password){
                return done(null,false);   
            }
            return done(null,user);
        })
}))

//serializing the user to decide which key to be kept in cookies
passport.serializeUser(function(user,done){
    done(null,user.id); //setting user id to cookies
});

passport.deserializeUser(function(id,done){   // Deserializing will help in getting user decrypted data in res.locals and res.cookies will give encrypted part
    User.findById(id,(err,user)=>{
        if(err){
            console.log('Error Deserializing user --> Passport');
            return done(err);
        }
        return done(null,user);
    });
})

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in then pass on the request to next function
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;