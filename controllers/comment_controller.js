const Comment = require('../models/comment');
const Post = require('../models/posts');

module.exports.create = function (req, res){

    Post.findById(req.body.post, function (err, post){
        if(err){
            console.log('this error in finding post and the error is : ', err);
        }
        if (post){
            //console.log('this is the post', post);
            Comment.create({
                content : req.body.content,
                post : post._id,
                user : req.user._id
            }, function(err, comment){
                //handle error
                if(err){
                    console.log('this error in creating comment and the error is : ', err);
                }
                post.comments.push(comment);
                post.save();

                res.redirect('/');
            })
        }
    });

}