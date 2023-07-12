const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');

router.get('/profile', passport.checkAuthentication , userController.profile);

router.get('/profile/:id', passport.checkAuthentication , userController.profile);

router.post('/update/:id', passport.checkAuthentication , userController.update);

router.get('/signIn', userController.signIn);

router.get('/signUp', userController.signUp);

router.post('/create', userController.create);

router.post('/createSession', userController.createSession);

router.post('/makeSession', passport.authenticate('local',{failureRedirect : '/users/signIn'}), userController.makeSession);

router.get('/signOut', userController.destroySession);

module.exports = router;