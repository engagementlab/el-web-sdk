/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Research projects directory view controller.
 * 
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 * 
 * @module research
 * @class project
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Project = keystone.list('Project');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res),
		locals = res.locals;
	
	// Init locals
	locals.section = 'projects';
	locals.filters = {
		_key: req.params.project_key
	};
	
	// Load the current project
	view.on('init', function(next) {
		
		var q = Project.model.findOne({key: locals.filters._key});
		
		// Setup the locals to be used inside view
		q.exec(function(err, result) {
			locals.project = result;
			locals.sub_section = result.category.key;

			// Combine feature text and images
			locals.projectFeatures = result.highlights.map(function(str, ind) { 
																return {text: str, image: result.headerImages[ind]} 
															 });
			locals.projectDates = result._.startDate.format("MMMM Do YYYY - ") + 
														( (result.endDate === undefined) ? "Current" : result.endDate.format("MMMM Do YYYY") );
			next(err); 
		});
		
	});
	
	// Render the view
	view.render('research/project');
	
}