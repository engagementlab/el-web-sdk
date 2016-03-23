/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2016
 * ==============
*/

 /**
 * Load the config data for the argued site module.
 *
 * ### Examples:
 *
 *		var siteConfig = require('./sites/config');
 *    siteConfig( require('site-package-name'), function callback() {} );
 *
 * @class Sites
 * @name sites/config
 * @param {Object} siteInst The site module instance
 * @param {Function} callback 
 * @return {Object} data Site's config data (from config.json)
 */
 module.exports = function(siteInst, callback) {

	var siteDir = siteInst.keystone._options['module root'];
	

	require('fs').readFile(siteDir + '/config.json', {encoding: 'utf8'}, function (err, data) {
	  if (err) throw err;
	  callback(JSON.parse(data));

	});
	
};