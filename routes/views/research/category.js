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
var Category = keystone.list('Category');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.projects = [],
	locals.category = {};

	locals.filters = {
		_category: req.params.category
	};
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'category';
	locals.sub_section = req.params.category;
	
	// Load category and category's projects
	view.on('init', function(next) {

		var queryCategory = Category.model.findOne({key: locals.filters._category});
		queryCategory.exec(function(err, resultCategory) {
			
			var queryProjects = Project.model.find({ category: resultCategory });
			queryProjects.exec(function(err, resultProjects) {

				locals.projects = resultProjects;
				locals.category = resultCategory;
				
				next(err);
			});

		});
		
	});

  // view.query('projects', keystone.list('Project').model.find());  

	// Render the view
	view.render('research/category');
	
};
