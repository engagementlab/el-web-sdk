// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

var express = require('express'),
		server = express(),
		compression = require('compression'),
		colors = require('colors'),
		// https://www.npmjs.com/package/express-vhost
		virtual = require('express-vhost'),
		siteConfig = require('./sites/config');

var mountSiteModule = function(site) {
	var appInstance = express();
	appInstance.use(compression());
	
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

		console.log('> Site ' + colors.rainbow(site) + ' mounted!'.italic);
	
	});
 
};

// Starts the server using express-vhost as middleware, trusting our nginx proxy
server.use(virtual.vhost(server.enabled('trust proxy')));
server.listen(3000, function() {

	console.log('## Server started! Please wait for sites to mount. ##'.bold.bgWhite.red);

	// Bootstrap our site modules here
	mountSiteModule('engagement-lab-home');
	mountSiteModule('civic-media-project');

});