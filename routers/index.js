const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require ('../controllers/home_controller');
const postsController = require('../controllers/posts_controller');
const usersRouter = require('./users');
console.log('router is working');


router.get('/', homeController.home);

router.use('/users', usersRouter);

router.use('/comments', require('./comments'));

module.exports = router;