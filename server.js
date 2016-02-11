// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

var express = require('express'),
		server = express(),
		// https://www.npmjs.com/package/express-vhost
		virtual = require('express-vhost'),
		siteConfig = require('./sites/config');

var mountSiteModule = function(site) {
	var appInstance = express();
	
	var sitePath = require.resolve(site),
			siteInst = require(site),
			siteFactory = require('./sites/factory');

	siteConfig(sitePath, function(configData) {

		var siteDomain = (configData.subdomain === undefined) ? 'localhost' : (configData.subdomain + '.localhost');

		var keystoneApp = siteFactory({ 
	
												config: configData,
												app: appInstance,
												keystone: siteInst.keystone,
												mongoose: siteInst.mongoose
	
											});

		virtual.register(
			siteDomain,
			keystoneApp
		);

		console.log('> Site "' + site + '" mounted!');
	
	});
 
};

server.use(virtual.vhost(server.enabled('trust proxy')));
server.listen(3000, function() {

	console.log('Server started! Please wait for sites to mount.');

	// Bootstrap our site modules here
	mountSiteModule('engagement-lab-home');
	mountSiteModule('civic-media-project');

});