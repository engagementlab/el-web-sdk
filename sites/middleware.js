/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2016
 * ==============
*/

var FrameworkMiddleware = (function() { 
		
	/**
	 * Common middleware for URL whitelisting. Prevents clickjacking.
	 * @param {Array} domains to allow as site masks, or embed-friendly domains.
	 */
	this.urlWhitelist = function(domains) {

		console.log('Using URL whitelist: '.white + domains.join(',').bgWhite.black);

	 	return function(req, res, next) {

	    // Allow certain domains to frame site
	    res.setHeader('Content-Security-Policy', 'frame-ancestors ' + domains.join(' '));

	    next();
	  
	  };

	};

});

module.exports = FrameworkMiddleware;