const Post = require('../models/posts');
const User = require('../models/user');

module.exports.home = function(req, res){
   
    Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path :'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err, posts){
            User.find({}, function(err, users){
                return res.render('home',{
                    title : "Codial | Home",
                    posts : posts,
                    all_users : users
                });
            })  
        })
}