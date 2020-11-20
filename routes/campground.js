const express = require('express');
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const {
	index,
	renderNewForm,
	createCampground,
	showCampgrounds,
	renderEditForm,
	updateCampground,
	deleteCampground
} = require('../controllers/campgrounds');
const router = express.Router();

router.route('/').get(catchAsync(index)).post(isLoggedIn, validateCampground, catchAsync(createCampground));

router.get('/new', isLoggedIn, renderNewForm);

router
	.route('/:id')
	.get(catchAsync(showCampgrounds))
	.put(isLoggedIn, isAuthor, validateCampground, catchAsync(updateCampground))
	.delete(isLoggedIn, isAuthor, deleteCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditForm));

module.exports = router;
