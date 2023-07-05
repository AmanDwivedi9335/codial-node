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

module.exports.destroy = function (req, res){
    Comment.findById(req.params.id, function(err, comment){
        if (comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            //below line we are removing comment reference from post comment array
            Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function (err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}