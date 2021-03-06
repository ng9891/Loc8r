var express = require('express');
var router = express.Router();
//var ctrlMain = require('../controllers/main.js');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

/* Location pages */
router.get('/', ctrlLocations.homelist);
router.get('/locations', ctrlLocations.locationInfo);
router.get('/locations/reviews/new', ctrlLocations.addReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;
