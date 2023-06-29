const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = function (req, res){

    Post.findById(req.body.post, function (err, post){
        if (post){
            Comment.create({
                content : req.body.content,
                post : post._id,
                user : req.user._id
            }, function(err, comment){
                //handle error
                post.comment.push(comment);
                post.save();

                res.redirect('/');
            })
        }
    });

}