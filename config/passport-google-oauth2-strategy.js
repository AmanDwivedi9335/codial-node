const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "727069492149-t9mfkka7cilvegr12aot5ndsgfs9meen.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://127.0.0.1:8000/users/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        //find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){console.log('error in google passport-strategy', err); return;}

            console.log(profile);
            if(user){
                //if found set this user as req.user
                return done(null, user);
            }else{
                //if not found create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){console.log('error in creating user  google passport-strategy', err); return;}
                    return done(null, user);
                });
            }
            
        });
    }

));

module.exports = passport;