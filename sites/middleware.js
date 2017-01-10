/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2016
 * ==============
*/
'use strict';

var FrameworkMiddleware = (function() { 

	let url = require('url')

	/**
		Initializes the standard view locals
	*/
	this.initLocals = function(req, res, next) {

    var locals = res.locals;
    locals.user = req.user;

    next();

	};

	/**
	    Inits the error handler functions into `req`
	*/
	this.initErrorHandlers = function(req, res, next) {
	    
	    res.err = function(err, title, message) {
	        res.status(500).render('errors/500', {
	            err: err,
	            errorTitle: title,
	            errorMsg: message
	        });
	    };
	    
	    res.notfound = function(title, message) {
	        res.status(404).render('errors/404', {
	            errorTitle: title,
	            errorMsg: message
	        });
	    };
	    
	    next();
	    
	};
		
	/**
	 * Common middleware for URL whitelisting. Prevents clickjacking.
	 * @param {Array} domains to allow as site masks, or embed-friendly domains.
	 */
	this.urlWhitelist = function(domains) {

		console.log('Using URL whitelist: '.white + domains.join(',').bgWhite.black);

	 	return function(req, res, next) {

	    // Allow certain domains to frame site
	    res.setHeader('Content-Security-Policy', 'frame-ancestors ' + domains.join(' '));
	    res.setHeader('Access-Control-Allow-Origin', domains.join(' '));

	    next();
	  
	  };

	};

	this.checkDebug = function(req, res, next) {

			// if(req.app.settings.env === 'development' && req.url.indexOf('#data') !== -1)
			// 	locals.datadump = true;

	    next();

	};


});

module.exports = FrameworkMiddleware;