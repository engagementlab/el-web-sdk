// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
// Ignore for staging env (heroku)
if (process.env.NODE_ENV !== 'staging')
	require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');
var mongooseRedisCache = require('mongoose-redis-cache');
var tamabehavior = require('./tamabehavior');
var Slack = require('slack-node');
var Twitter = require('twitter');

var slackInstance;
var twitterInstance;

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

// Used only for production, otherwise sessions are stored in-memory
if (process.env.NODE_ENV === 'production') {

	keystone.set('session store', 'connect-mongostore');
	keystone.set('session store options', {
		"db": {
			"name": "engagement-lab",
			"servers": [
				{ "host": "127.0.0.1", "port": 27017 }
			]
		}
	});

}
else
	console.log('DEVELOPMENT mode!');

// Load your project's Models
keystone.import('models');

// Slack API instantiation
slackInstance = new Slack(process.env.SLACK_API_KEY);
slackInstance.setWebhook(process.env.SLACK_HOOK_URI);
slackInstance.channel = '#website_updates';
slackInstance.user = 'ELBot';
slackInstance.user_icon = 'http://res.cloudinary.com/engagement-lab-home/image/upload/v1454193996/site/logo_bot.png';

// Twitter API instantiation
twitterInstance = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// slack needs to be be accessible anywhere;
// this is not a keystone config var, though (yet)
keystone.set('slack', slackInstance);

keystone.set('twitter', twitterInstance);
keystone.set('tamabehavior', tamabehavior);

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