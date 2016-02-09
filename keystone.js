// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

var express = require('express'),
		server = express(),
		evh = require('express-vhost'),
		handlebars = require('express-handlebars');


var keystoneConfig = {};
var hbsHelpers = new require('./templates/helpers')();

var appFactory = function(site, route) {
	var app = express();	
	var keystone = require(site);

	
	return setGlobalConfig(
		require('keystone'), 
		route,
		app
	);
 
};

var setGlobalConfig = function(keystoneInst, siteRoute, app) {
	keystoneInst.init({
		'brand' 'Engagement Lab',
		'module root': __dirname + '/sites/' + siteRoute + '/'

	});

	keystoneInst.set('auto update', true);
	keystoneInst.set('session', true);
	keystoneInst.set('auth', true);
	keystoneInst.set('user model', 'User');
	
	keystoneInst.set('sass', ['../../public', 'public']);
	keystoneInst.set('static', ['../../public', 'public']);
	keystoneInst.set('views', './templates/views');
	keystoneInst.set('view engine', 'hbs');
		
	keystoneInst.set('custom engine',
		handlebars.create({
			layoutsDir: 'sites/' + siteRoute + '/templates/layouts',
			partialsDir: 'sites/' + siteRoute + '/templates/partials',
			defaultLayout: 'base',
			helpers: hbsHelpers,
			extname: '.hbs'
		}).engine
	);

	keystoneInst.set('locals', {

		_: require('underscore'),
		env: keystoneInst.get('env'),
		utils: keystoneInst.utils,
		editable: keystoneInst.content.editable

	});

	// prefix all built-in tags with 'keystone_'
	keystoneInst.set('cloudinary prefix', 'keystone');

	// prefix each image public_id with [{prefix}]/{list.path}/{field.path}/
	keystoneInst.set('cloudinary folders', true);

	// Load your project's Models
	keystoneInst.import('models');

	// Load this site's routes
	keystoneInst.set('routes', require(__dirname + '/sites/' + siteRoute + '/routes'));
	 
	// Configure Admin UI
	keystoneInst.set('nav', {
		'about': ['About']
	});

	keystoneInst.mount('/', app);

	return keystoneInst.app;

}

server.use(evh.vhost(server.enabled('trust proxy')));
server.listen(3000, function() {
	console.log('Server started!');
});

evh.register('localhost', appFactory('engagement-lab', 'elab'));
evh.register('cmp.localhost', appFactory('civic-media-project', 'cmp'));