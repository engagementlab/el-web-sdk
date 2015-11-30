/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Academics page view controller.
 * 
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 * 
 * @class academics
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Academics = keystone.list('Academics');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'academics';
	
	// Load the current project
	view.on('init', function(next) {
			
		var q = Academics.model.findOne({}, {}, { sort: { 'createdAt' : -1 } });

		q.exec(function(err, result) {
			locals.academics = result;

			next(err); 
		}); 
	
	});

	// Render the view
	view.render('academics');
	
}