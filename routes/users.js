const express = require('express');
const passport = require('passport');
const { renderRegister, register, renderLogin, login, logout } = require('../controllers/users');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');

router.route('/register').get(renderRegister).post(catchAsync(register));

router
	.route('/login')
	.get(login)
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), renderLogin);

router.get('/logout', logout);

module.exports = router;
