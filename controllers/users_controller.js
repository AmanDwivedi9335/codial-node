const User = require('../models/user');
const fs = require('fs');
const path = require('path');

//profile control
module.exports.profile = function(req, res){
  User.findById(req.params.id || req.user, function(err, user){
    return res.render('user_profile',{
      title: 'User Profile',
      profile_user : user
    });
  });
}

//render sign in page
module.exports.signIn = function (req, res){
  if(req.user){
    return res.redirect('/users/profile')
  }

    return res.render('user_signIn');
}

module.exports.signUp = function (req, res){
  if(req.user){
    return res.redirect('/users/profile')
  }
  
    return res.render('user_signUp');
}

//user signin controller
 module.exports.createSession = function(req, res){
    
//     //find the user
//     User.findOne({email: req.body.email})
    
//     //handle user found
//     .then((user)=>{if(!user){
//         User.createSession.then(User.password != req.body.password)
//         return res.redirect('/users/signUp');
//     } else{
//         res.cookie('user_id', user.id);    
//         return res.redirect('/users/profile');
//     }
//     }).catch(err=>{
//         return console.error(err);
//     })

// }

User.findOne({ email: req.body.email })
  .then((user) => {
    console.log(user);
    console.log(req.body);
    if (!user || user.password !== req.body.password) {
      // User not found, handle accordingly (e.g., redirect to signup page)
      return res.redirect('/');
    } // User found, check password and handle accordingly
       else {
      // Correct password, set user_id cookie and redirect to profile page
        res.cookie('user_id', user.id);
        return res.redirect('/users/profile');
      }
    }
  )
  .catch((err) => {
      // Handle the error appropriately
    return err;
  });}

//user signup controller
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

module.exports.makeSession = function(req, res){
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
}

// module.exports.destroySession = function(req, res){
//   req.logout(req.user, err=>{
//     if (err){

//       return;
//     }else{
//       req.flash('success', 'Logged out Successfully');
//       res.redirect('/')
//     }
  

//   });
//   return res.redirect('/');
// }

module.exports.destroySession = function(req, res) {
  req.logout(req.user, err => {
    if (err) {
      return;
    } else {
      req.flash('error', 'Logged out Successfully'); 
      res.redirect('/');
    }
  });
};

module.exports.update = async function(req, res){
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
  //     return res.redirect('back');
  //   });
  // }else{
  //   res.status(401);
  // }
  if(req.user.id == req.params.id){
    try{
      let user = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function(err){
        if(err) {console.log('*****Multer Error: ', err)}

        user.name = req.body.name;
        user.email = req.body.email;

        if(req.file){
          if(user.avatar){
            fs.unlinkSync(path.join(__dirname, '..', user.avatar));
          }
          
          // this is saving the path  of the  uploaded file into the avatar field in the user
          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user.save();
        return res.redirect('back');

      });


    }
    catch(err){
      req.flash('error', err);
      return res.redirect('back');
    }
  }else{
    req.flash('error', 'Unauthorized!');
    res.status(401).send('Unauthorized');
  }
}