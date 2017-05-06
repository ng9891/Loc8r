//Manage connections to the database
var mongoose = require ('mongoose');

//NODE_ENV development
var dbURI= 'mongodb://localhost/Loc8r';

//NODE_ENV production
if (process.env.NODE_ENV === 'production'){
	dbURI = 'Connection to the database'
}

mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
	console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error ' + err);
});

mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected');
});

var gracefulShutdown = function (msg, callback){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through ' + msg);
		callback();
	});
};

//Nodemon restart SIGUSR2
process.once('SIGUSR2', function () {
	gracefulShutdown('nodemon restart', function () {
		process.kill(process.pid, 'SIGUSR2');
	});
});

//App termination SIGINT
process.on('SIGINT', function () {
	gracefulShutdown('app termination', function () {
		process.exit(0);
	});
});

//Heroku app termination SIGTERM
process.on('SIGTERM', function () {
	gracefulShutdown('Heroku app termination', function () {
		process.exit(0);
	});
});

//Schema for locations
require('./locationModels');