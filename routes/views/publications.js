/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Publications page view controller.
 * 
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 * 
 * @class Publications
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Publications = keystone.list('Publications');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'publications';
	
	// Load the current project
	view.on('init', function(next) {
			
		var q = Publications.model.findOne({}, {}, { sort: { 'createdAt' : -1 } });

		q.exec(function(err, result) {
			locals.publications = result;

			next(err); 
		}); 
	
	});

	// Render the view
	view.render('publications');
	
}