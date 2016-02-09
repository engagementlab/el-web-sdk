var express = require('express'),
	server = express();

var evh = require('express-vhost');

handlebars = require('express-handlebars');

 
//...do your normal express setup stuff, add middleware and routes (but not static content or error handling middleware yet)

// app.keystone.set('app', app);

var keystoneConfig = {};

var appFactory = function(site, route) {
	var app = express();
	keystoneConfig.route = route;
	app.keystone = require(site)(keystoneConfig);
	app.keystone.mount('/', app, function() {
		//put your app's static content and error handling middleware here and start your server

	});
	return app;
 
};

server.use(evh.vhost(server.enabled('trust proxy')));
server.listen(3000);

evh.register('localhost', appFactory('elab-home', 'elab-home'));
evh.register('cmp.localhost', appFactory('civic-media-project', 'cmp'));