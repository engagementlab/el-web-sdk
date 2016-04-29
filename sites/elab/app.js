// Return server object
serverStart = function() {

	return require('express')();

};

// Any custom app initialization logic should go here
appStart = function(app) {
};

module.exports = function(frameworkDir) {

	var keystoneInst = require('keystone');
	var tamabehavior = require('./tamabehavior');

	// Obtain app root path and set as keystone's module root
	keystoneInst.set('module root', __dirname);

	// lolz
	keystoneInst.set('tamabehavior', tamabehavior);	

	return { 
		keystone: keystoneInst,
		server: serverStart,
		start: appStart	
	}
};