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

// Load .env vars
if(process.env.NODE_ENV !== 'test')
	require('dotenv').load();

var express = require('express'),
		app = express(),
		virtualServer = require('http').createServer(app),
		virtual = require('express-vhost'),
		logger = require('winston'),
		siteConfig = require('./sites/config'),
		SiteFactory = require('./sites/factory');

colors = require('colors');

var serverPort = (process.env.NODE_ENV === 'staging') ? 3001 : 3000;

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
 * @param {Boolean} is there only one site being mounted?
 * @see https://www.npmjs.com/package/express-vhost
 */
var mount = function(siteModuleName, singleDomain, callback) {

	var siteInst = require(siteModuleName)(__dirname, !singleDomain);
	var sitePath = require.resolve(siteModuleName).replace('app.js', '');
	var appInstance = siteInst.server();
	
	siteConfig(siteInst, sitePath, function(configData) {
		
		// Configure the site's domain
		// Don't use subdomain if this is a single-domain site
		var siteDomain = (configData.subdomain === undefined || singleDomain) ? process.env.ROOT_DOMAIN : (configData.subdomain + '.' + process.env.ROOT_DOMAIN);

		// Initialize keystone instance and then register the mounted app
		new SiteFactory({ 

				moduleName: siteModuleName,
				config: configData,
				app: appInstance,
				server: virtualServer,
				keystone: siteInst.keystone

			}, function(keystoneApp) {

				// Register this app as a virtual host
				virtual.register(
					siteDomain,
					keystoneApp
				);

				// Run any of this site's custom start logic
				siteInst.start(appInstance);

				logger.info('> Site ' + colors.rainbow(siteModuleName) + ' mounted'.italic + ' at ' + siteDomain);
 
				if(callback !== undefined)
					callback();

		});

	
	});
 
};

/**
 * Start the server. 
 * This will mount all site modules in ./sites/ or only those specified by the '--sites' CLI argument (e.g. --sites=site-1,site-2).
 *
 * ### Examples:
 *
 *     launch();
 *
 * @class Main
 * @name server/launch
 */
var launch = function(callback) {
  
  /* Global accessor for underscore  */
	_ = require('underscore');

	// Starts the server using express-vhost as middleware, trusting our nginx proxy
	app.use(virtual.vhost(app.enabled('trust proxy')));

	virtualServer.listen(serverPort, function() {

		logger.info('███████╗███╗   ██╗ ██████╗  █████╗  ██████╗ ███████╗███╗   ███╗███████╗███╗   ██╗████████╗    ██╗      █████╗ ██████╗'.bgCyan.black);
		logger.info('██╔════╝████╗  ██║██╔════╝ ██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝    ██║     ██╔══██╗██╔══██╗'.bgCyan.black);
		logger.info('█████╗  ██╔██╗ ██║██║  ███╗███████║██║  ███╗█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║       ██║     ███████║██████╔╝'.bgCyan.black);
		logger.info('██╔══╝  ██║╚██╗██║██║   ██║██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║       ██║     ██╔══██║██╔══██╗'.bgCyan.black);
		logger.info('███████╗██║ ╚████║╚██████╔╝██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║       ███████╗██║  ██║██████╔╝'.bgCyan.black);
		logger.info('╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚══════╝╚═╝  ╚═╝╚═════╝'.bgCyan.black);

		logger.info('=== Site Bootstrapping Framework ==='.bgBlack.cyan);
		logger.info('## Server started! Please wait for sites to mount...'.bold.bgWhite.red);

		/*!
		 * Bootstrap our site modules here.
		 * This will either load all sites or those specified by the '--sites' CLI argument.
		 */
		var sitesArg = process.argv[2];
		
		// Check if any sites specified by CLI (ignore for testing)
		if(sitesArg && process.argv[1].indexOf('mocha') === -1) {

			// Site are a comma-sep list
			var arrSites = sitesArg.replace('--sites=', '').split(',');

			logger.info('## -> Only the following site modules will be mounted: '.bgWhite.red + arrSites.join(', ').bgWhite.red);

			// Mount each site
			for(var ind in arrSites) {
				var singleDomain = arrSites.length === 1;
				
				mount(arrSites[ind], singleDomain);
			}

		}
		else 
			throw new Error("A site module(s) must be specified!");	

	});

};

// Export commands
module.exports = function(callback) {
	return {
		launch: launch
	};
}
