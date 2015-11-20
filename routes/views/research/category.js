/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Research projects category view controller.
 * 
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 * 
 * @module research
 * @class category
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Project = keystone.list('Project');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.data = {
		projects: []
	};	
	locals.filters = {
		_category: req.params.category.replace('-', ' ')
	};
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'category';
	
	// Load category's projects
	view.on('init', function(next) {
		
		var q = Project.model.find({category: locals.filters._category});
		
		q.exec(function(err, result) {
			locals.data.projects = result;
			next(err);
		});
		
	});

  view.query('projects', keystone.list('Project').model.find());  

	// Render the view
	view.render('research/category');
	
};
