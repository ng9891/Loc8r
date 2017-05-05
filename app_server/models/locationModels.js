var mongoose = require ('mongoose');

//OpeningtimeSchema is a subdocument of locationSchema
var openingTimeSchema = new mongoose.Schema({
	days: {type: String, required: true},
	opening: string,
	closing: string,
	closed: {type: Boolean, required: true}
});

var reviewSchema = new mongoose.Schema({
	author: String,
	rating: {type: Number, "default": 0, min: 0, max: 5},
	createdOn: {type: String, "default": Date.now}
	reviewText: String
});

var locationSchema = new mongoose.Schema({ 
	name: {type: String, required: true},
	address: String,
	rating: {type: Number, "default":0, min: 0, max: 5},
	facilities: [String],
	coords: {type: Number, index: '2dsphere'},
	openingTimes: [openingTimeSchema]
	reviews: [reviewSchema]
});

mongoose.model('locationModels', locationSchema, 'locationdb');