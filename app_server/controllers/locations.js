/* GET about page. */
module.exports.homelist = function(req,res){
		res.render('locations-list', {
			title: 'Home',
			midBody: 'This is the midBody'
		});
};

/* GET Location info page. */
module.exports.locationInfo = function(req,res){
		res.render('location-info', {
			title: 'Location Info',
			midBody: 'This is the midBody' 
		});
};

/* GET add review page. */
module.exports.addReview = function(req,res){
		res.render('index', {
			title: 'Add review',
			midBody: 'This is the midBody'
		});
};