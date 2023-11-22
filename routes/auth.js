const express = require('express');
const router = express.Router();
const authentication = require('../functions/authentication');

// Login route
router.post('/login', authentication.login);

// Signup route
router.post('/signup', authentication.signup);

// Logout route
router.post('/logout', authentication.logout);

// Forget password route
router.post('/forgetpwd', authentication.forgetPassword);

module.exports = router;