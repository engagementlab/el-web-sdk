// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
// Ignore for staging env (heroku)
if (process.env.NODE_ENV !== 'staging')
	require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');
var mongooseRedisCache = require('mongoose-redis-cache');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Engagement Lab',
	'brand': 'Engagement Lab',
	
	'sass': 'public',
	
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	
	'custom engine': handlebars.create({
		layoutsDir: 'templates/layouts',
		partialsDir: 'templates/partials',
		defaultLayout: 'base',
		helpers: new require('./templates/helpers')(),
		extname: '.hbs'
	}).engine,
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User'

});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

// Load your project's Routes

keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'projects': ['projects', 'publications'],
	'programs': 'programs',
	'shared': ['resources'],
	'about': ['About', 'partners', 'Academics', 'people'],
	'structure': ['directories', 'subdirectories', 'users']
});

// prefix all built-in tags with 'keystone_'
keystone.set('cloudinary prefix', 'keystone');

// prefix each image public_id with [{prefix}]/{list.path}/{field.path}/
keystone.set('cloudinary folders', true);

// Start Keystone to connect to your database and initialise the web server
keystone.start();