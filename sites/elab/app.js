// Return server object
serverStart = function() {

	return require('express')();

};

// Any custom app initialization logic should go here
appStart = function(app) {
};

module.exports = function() { return { 
		keystone: require('keystone'),
		server: serverStart,
		start: appStart	
}}();