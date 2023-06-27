const Post = require('../models/posts');

module.exports.create = function(req, res){
    console.log(req.user);
    Post.create({
        content : req.body.content,
        user : req.user._id
    }, function(err, posts){
        if(err){
            console.log('Error in creating post');
        }else{
            return res.redirect('back');
        }
    }
    );
}