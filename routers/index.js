const express = require('express');
const router = express.Router();

const homeController = require ('../controllers/home_controller');
const usersRouter = require('./users')
console.log('router is working');

router.get('/', homeController.home);
router.use('/users', usersRouter);

module.exports = router;