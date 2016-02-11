module.exports = function(params) { 

	var handlebars = require('express-handlebars'),
			hbsHelpers = require('../templates/helpers')();

	var siteConfig = params.config, 
			siteRoot =  __dirname + '/' + siteConfig.directory + '/',
			appInst = params.app,
			keystoneInst = params.keystone,
			mongooseInst = params.mongoose;

	mongooseInst.createConnection('mongodb://localhost/' + siteConfig.database);
	
	keystoneInst.init({
		
		'name': siteConfig.name,
		'brand': 'Engagement Lab',
		'module root': siteRoot,

		'auto update': true,
		'session': true,
		'auth': true,
		'user model': 'User',

		// Setup SASS and Handlebars
		'sass': [siteRoot + '../../public', siteRoot + 'public'],
		'static': [siteRoot + '../../public', siteRoot + 'public'],
		'views': siteRoot + 'templates/views',
		'view engine': 'hbs',
		'custom engine':
			handlebars.create({
				layoutsDir: siteRoot + 'templates/layouts',
				partialsDir: siteRoot + 'templates/partials',
				defaultLayout: 'base',
				helpers: hbsHelpers,
				extname: '.hbs'
			}).engine,

		// Use custom mongoose instance
		'mongoose': mongooseInst,

		'locals': {

			_: require('underscore'),
			env: keystoneInst.get('env'),
			utils: keystoneInst.utils,
			editable: keystoneInst.content.editable

		},

		// prefix all built-in tags with 'keystone_'
		'cloudinary prefix': 'keystone',

		// prefix each image public_id with [{prefix}]/{list.path}/{field.path}/
		'cloudinary folders': true

	});

	// Load this site's models
	keystoneInst.import('models');

	// Load this site's routes
	keystoneInst.set('routes', require(siteRoot + 'routes'));
	 
	// Configure Admin UI
	keystoneInst.set('nav', {
		'about': ['About']
	});

	keystoneInst.mount('/', appInst);
	
	return keystoneInst.app;

};