const express = require('express');
const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile);

router.get('/signIn', userController.signIn);

router.get('/signUp', userController.signUp);

router.post('/create', userController.create);

router.post('/createSession', userController.createSession);

module.exports = router;