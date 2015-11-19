/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Team view controller.
 * 
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 * 
 * @class team
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Team = keystone.list('Team');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'people';
	
	// Load the current project
	view.on('init', function(next) {
		
		var q = Team.model.find({});
		var categorize = function(val, cat) {
										return val.filter(function(item) { return item.category == cat; });
									 };
		
		// Setup the locals to be used inside view
		q.exec(function(err, result) {
			
			locals.directors = categorize(result, 'directors');
			locals.lab = categorize(result, 'lab');
			locals.assistants = categorize(result, 'assistants');
			locals.fellows = categorize(result, 'fellows');
			locals.advisors = categorize(result, 'advisors');

			next(err); 
		});
		
	});
	
	// Render the view
	view.render('people');
	
}