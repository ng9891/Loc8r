/* API review Controller. */
var mongoose = require ('mongoose');
var Loc = mongoose.model('locationModels');

var basicl = require ('../_includes/basicLib');

//get
module.exports.reviewsReadOne = function(req,res){
	if (req.params && req.params.locationid && req.params.reviewid) {
		Loc
			.findById(req.params.locationid)
			.select('name reviews')
			.exec(function(err, location){
				var review;
				var response;
				if (!location){
					basicl.sendJsonResponse (res,404,{
						"message": "locationid not found"
					});
					return;
				} else if (err){
					basicl.sendJsonResponse (res,404,err);
					return;
				}
				//basicl.sendJsonResponse(res, 200, {"status" : "success"});
				
				if (location.reviews && location.reviews.length >0){
					//console.log("This is req.review.id = " + req.params.reviewid)
					review = location.reviews.id(req.params.reviewid); //get the object with id=var
					//console.log("This is review = " + review);
					if(!review){
						basicl.sendJsonResponse(res, 404, {
							"message":"Review is empty or doesn't exist"
						});
					} else {
						response = {
							location: {
								name: location.name,
								id: req.params.locationid
							},
							review : review
						};
						basicl.sendJsonResponse (res, 200 , response);
					}
				} else{
					basicl.sendJsonResponse(res,404,{
						"message":"No reviews found with the ID"
					});
				}
			});
	}
	else{
		basicl.sendJsonResponse (res,404,{
			"message": "No locationid in request"
		});
	}
};

//post
module.exports.reviewsCreate = function(req,res){
	basicl.sendJsonResponse(res, 200, {"status" : "success"});
};
//put
module.exports.reviewUpdateOne = function(req,res){
	basicl.sendJsonResponse(res, 200, {"status" : "success"});
};
//delete
module.exports.reviewsDeleteOne = function(req,res){
	basicl.sendJsonResponse(res, 200, {"status" : "success"});
};