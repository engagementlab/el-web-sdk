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
require('dotenv').load();

var express = require('express'),
		app = express(),
		virtualServer = require('http').createServer(app),
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
 * @param {Boolean} is there only one site being mounted?
 * @see https://www.npmjs.com/package/express-vhost
 */
var mount = function(siteModuleName, singleDomain) {

	var siteInst = require(siteModuleName);

	var appInstance = siteInst.server();
	appInstance.use(compression());
	
	siteConfig(siteInst, function(configData) {
		
		// Configure the site's domain
		// Only engagement-lab-home has no configData.subdomain
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

				console.log('> Site ' + colors.rainbow(siteModuleName) + ' mounted'.italic + ' at ' + siteDomain);

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
var launch = function() {

	// Starts the server using express-vhost as middleware, trusting our nginx proxy
	app.use(virtual.vhost(app.enabled('trust proxy')));

	virtualServer.listen(serverPort, function() {

		console.log('███████╗███╗   ██╗ ██████╗  █████╗  ██████╗ ███████╗███╗   ███╗███████╗███╗   ██╗████████╗    ██╗      █████╗ ██████╗'.bgCyan.black);
		console.log('██╔════╝████╗  ██║██╔════╝ ██╔══██╗██╔════╝ ██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝    ██║     ██╔══██╗██╔══██╗'.bgCyan.black);
		console.log('█████╗  ██╔██╗ ██║██║  ███╗███████║██║  ███╗█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║       ██║     ███████║██████╔╝'.bgCyan.black);
		console.log('██╔══╝  ██║╚██╗██║██║   ██║██╔══██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║       ██║     ██╔══██║██╔══██╗'.bgCyan.black);
		console.log('███████╗██║ ╚████║╚██████╔╝██║  ██║╚██████╔╝███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║       ███████╗██║  ██║██████╔╝'.bgCyan.black);
		console.log('╚══════╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝       ╚══════╝╚═╝  ╚═╝╚═════╝'.bgCyan.black);

		console.log('=== Site Bootstrapping Framework ==='.bgBlack.cyan);
		console.log('## Server started! Please wait for sites to mount...'.bold.bgWhite.red);

		/*!
		 * Bootstrap our site modules here.
		 * This will either load all sites or those specified by the '--sites' CLI argument.
		 */
		var sitesArg = process.argv[2];

		// Check if any sites specified by CLI
		if(sitesArg !== undefined) {

			// Site are a comma-sep list
			var arrSites = sitesArg.replace('--sites=', '').split(',');

			console.log('## -> Only the following site modules will be mounted: '.bgWhite.red + arrSites.join(', ').bgWhite.red);

			// Mount each site
			for(var ind in arrSites) {
				var singleDomain = arrSites.length === 1;
				
				mount(arrSites[ind], singleDomain);
			}

		}
		else {
			console.log('## -> All site modules will be mounted. '.bgWhite.red);

			// Mount all sites
			mount('engagement-lab-home');
			// mount('el-bot');
		}

		console.log('##'.bold.bgWhite.red);		

	});

};

// Start server
launch();