const express = require('express');
const authController = require('../controllers/authController');
const loginLimiter = require('../utils/loginLimiter');

const router = express.router();

router.route('/').post(loginLimiter, authController.login);

router.route('/refresh').get(authController.refresh);

router.route('/logout').post(authController.logout);

module.exports = router;
