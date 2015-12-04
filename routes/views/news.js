/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * News/blog page view controller.
 * 
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 * 
 * @class news
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');

// HTTP requester
var request = require('request');
// RSS reader
var feed = require("feed-read");

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;

	var eventsParams = {
	  host: 'http://eventbriteapi.com',
	  path: '/v3/users/me/owned_events/?token=HC62RVWGRYQNBDLBNVFQ&status=live'
	};
	var blogParams = {
	  host: 'https://medium.com',
	  path: '/feed/@Engagement_Lab'
	};
	
	// Init locals
	locals.section = 'news';
	
	// Load the current project
	view.on('init', function(next) {
		
		// Setup the locals to be used inside view
		// First get events feed
		request(eventsParams.host + eventsParams.path, function (error, response, body) {
		  
			if (!error && response.statusCode == 200)
				locals.events = JSON.parse(body).events;

			// Next get Medium RSS feed
			feed(blogParams.host + blogParams.path, function(err, articles) {

				locals.blog = articles;

				next(err); 

			});

		});
		
	});
	
	// Render the view
	view.render('news');
	
}