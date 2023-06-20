const User = require('../models/user');

module.exports.profile = function(req, res){
    res.send('<h1>User Profiles</h2>');
}   

module.exports.signIn = function (req, res){
    return res.render('user_signIn');
}

module.exports.signUp = function (req, res){
    return res.render('user_signUp');
}

//user signin controller
module.exports.createSession = function(req, res){
    //todo Later
}

//user signin controller
module.exports.create = function(req, res){
    if (req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    .then(user=>{if(!user){
        User.create(req.body).then(creatuser=>{
                return res.redirect('/users/signIn');
        })
        .then(err=>{
            return err;
        })
       }else{
             return res.redirect('back');
       }})
        .catch(err=>{console.log('error in finding user in signing up');return});
    }