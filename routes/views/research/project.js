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
var Resource = keystone.list('Resource');

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
		
		// This query gets a project by the key in the URL and populates resources from its model
		var projectQuery = Project.model.findOne({key: locals.filters._key}).populate('videos articles files');
		
		// Setup the locals to be used inside view
		projectQuery.exec(function(err, result) {
			locals.project = result;
			locals.sub_section = result.category.key;

			// Combine feature text and images
			locals.projectFeatures = result.headerImages.map(function(img, ind) { 
																return {text: result.highlights[ind], image: img} 
															 });
			
			// Format dates
			locals.projectDates = result._.startDate.format("MMMM Do YYYY - ") + 
														( (result.endDate === undefined) ? "Current" : result.endDate.format("MMMM Do YYYY") );

			next(err); 
		});
		
	});
	
	// Render the view
	view.render('research/project');
	
}