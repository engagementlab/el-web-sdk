/*!
 *    ___________                                                        __    .____          ___.    
 *    \_   _____/ ____   _________    ____   ____   _____   ____   _____/  |_  |    |   _____ \_ |__  
 *     |    __)_ /    \ / ___\__  \  / ___\_/ __ \ /     \_/ __ \ /    \   __\ |    |   \__  \ | __ \ 
 *     |        |   |  / /_/  / __ \/ /_/  \  ___/|  Y Y  \  ___/|   |  |  |   |    |___ / __ \| \_\ \
 *    /_______  |___|  \___  (____  \___  / \___  |__|_|  /\___  |___|  |__|   |_______ (____  |___  /
 *            \/     \/_____/     \/_____/      \/      \/     \/     \/               \/    \/    \/ 
 * 
 *		===	Site Bootstrapping Framework ===
 *
 */

// Ignore for staging env (heroku)
if (process.env.NODE_ENV !== 'staging') {
 // Load .env vars
	require('dotenv').load();
}

var express = require('express'),
		server = express(),
		compression = require('compression'),
		virtual = require('express-vhost'),
		siteConfig = require('./sites/config'),
		SiteFactory = require('./sites/factory');

var serverPort = (process.env.NODE_ENV === 'staging') ? 3001 : 3000;

colors = require('colors');

/**
 * Mount a sub-module in /sites as a virtual host.
 *
 * ### Examples:
 *
 *     mountSiteModule('engagement-lab-home');
 *
 * @class Main
 * @name server/mount
 * @param {String} site The name of the module, found in sites/[sitedir]/package.json
 * @see https://www.npmjs.com/package/express-vhost
 */
var mount = function(site) {

	var appInstance = express().use(compression());
	
	var siteInst = require(site);

	siteConfig(siteInst, function(configData) {

		// Configure the site's domain
		// Only engagement-lab-home has no configData.subdomain
		var siteDomain = (configData.subdomain === undefined) ? 'localhost' : (configData.subdomain + '.localhost');

		// Initialize keystone instance and get mounted app
		new SiteFactory({ 

				config: configData,
				app: appInstance,
				keystone: siteInst.keystone,
				mongoose: siteInst.mongoose

			}, function(keystoneApp) {

				// Register this app as a virtual host
				virtual.register(
					siteDomain,
					keystoneApp
				);

				console.log('> Site ' + colors.rainbow(site) + ' mounted!'.italic);

		});

	
	});
 
};

// Starts the server using express-vhost as middleware, trusting our nginx proxy
server.use(virtual.vhost(server.enabled('trust proxy')));
server.listen(serverPort, function() {

	console.log('## Server started! Please wait for sites to mount... ##'.bold.bgWhite.red);

	// Bootstrap our site modules here
	mount('engagement-lab-home');
	mount('civic-media-project');

});