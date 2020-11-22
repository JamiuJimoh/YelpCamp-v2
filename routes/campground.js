if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
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

router
	.route('/')
	.get(catchAsync(index))
	.post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(createCampground));

router.get('/new', isLoggedIn, renderNewForm);

router
	.route('/:id')
	.get(catchAsync(showCampgrounds))
	.put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(updateCampground))
	.delete(isLoggedIn, isAuthor, deleteCampground);

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(renderEditForm));

module.exports = router;
