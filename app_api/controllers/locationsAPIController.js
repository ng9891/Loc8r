/* API locations page controller. */
var mongoose = require ('mongoose');
var Loc = mongoose.model('locationModels');
var basicl = require ('../_includes/basicLib');

//Locations
//Post
module.exports.locationsCreate = function(req,res){
	basicl.sendJsonResponse(res, 200, {"status" : "success"});
};

//GET
module.exports.locationsListByDistance = function(req,res){
	console.log("Locationslistbydistance is called");
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var maxDistance = parseFloat(req.query.max);
	var point ={
		type: "Point",
		coordinates: [lng, lat]
	};
	
	var geoOptions={
		spherical: true,
		num: 10,
		maxDistance: basicl.meterConversion.kmToM(maxDistance)
	};
	
	if (!lng || !lat || !maxDistance) {
		console.log("lng = " + lng + "  lat= " + lat + "  maxDistance= " + maxDistance);
		console.log('locationsListByDistance missing params');
		basicl.sendJsonResponse(res, 404, {
			"message": "lng, lat and maxDistance query parameters are all required"
		});
		return;
	}
	Loc.geoNear(point, geoOptions, function(err, results, stats) {
		var locations;
		console.log('Geo Results', results); //results ssend back an array of objects
		console.log('Geo stats', stats);
		if (err) {
		  console.log('geoNear error:', err);
		  basicl.sendJsonResponse(res, 404, err);
		} else {
		  locations = buildLocationList(req, res, results, stats);
		  basicl.sendJsonResponse(res, 200, locations);
		}
	});
};
//Helper function for upper method LocationListByDistance
var buildLocationList = function(req, res, results, stats) {
  var locations = [];
  results.forEach(function(doc) {
    locations.push({
      distance: basicl.meterConversion.mToKm(doc.dis),
      name: doc.obj.name,
      address: doc.obj.address,
      rating: doc.obj.rating,
      facilities: doc.obj.facilities,
      _id: doc.obj._id
    });
  });
  return locations;
};

//Get
module.exports.locationsReadOne = function(req,res){
	if (req.params && req.params.locationid) {
		Loc
			.findById(req.params.locationid)
			.exec(function(err, location){
				if (!location){
					basicl.sendJsonResponse (res,404,{
						"message": "locationid not found"
					});
					return;
				} else if (err){
					basicl.sendJsonResponse (res,404,err);
					return;
				}
				basicl.sendJsonResponse (res,200,location);
			});
	}
	else{
		basicl.sendJsonResponse (res,404,{
			"message": "No locationid in request"
		});
	}
};
//Put
module.exports.locationsUpdateOne = function(req,res){
	basicl.sendJsonResponse (res,200,{"status" : "success"});
};
//Delete
module.exports.locationsDeleteOne = function(req,res){
	basicl.sendJsonResponse (res,200,{"status" : "success"});
};