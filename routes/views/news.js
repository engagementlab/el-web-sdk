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

// RSS reader
var feed = require("feed-read");

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'news';
	
	// Load the current project
	view.on('init', function(next) {

		feed("https://medium.com/feed/@johnny.richardson", function(err, articles) {

			locals.blog = articles;

			next(err); 

		});
		
	});
	
	// Render the view
	view.render('news');
	
}