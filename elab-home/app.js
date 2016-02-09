module.exports = function(config) {

// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();
 
// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.
 
keystone.init({
	
	'name': 'Engagement Lab',
	'brand': 'Engagement Lab',
	
	'sass': 'public',
	
	'static': 'public',
	'favicon': 'public/favicons/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	
	'custom engine': handlebars.create({
		layoutsDir: 'templates/layouts',
		partialsDir: 'templates/partials',
		defaultLayout: 'base',
		helpers: new require('./templates/helpers')(),
		extname: '.hbs'
	}).engine,

	'mongo': process.env.MONGO_URI,

	'auto update': true,
	'session': true,

	'auth': true,
	'user model': 'User'
	
});
 
// Load your project's Models
keystone.import('models');

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

return keystone;
};