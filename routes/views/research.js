/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Research projects directory view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 * 
 * @class research
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
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'research';
	
	// Load project categories
	/*view.on('init', function(next) {
		
		var q = keystone.list('Project').paginate({
				page: req.query.page || 1,
 				perPage: 10,
 				maxPages: 10
		});
		
		q.exec(function(err, results) {
			locals.data.projects = results;
			next(err);
		});
		
	});*/

  view.query('projects', keystone.list('Project').model.find());  

	// Render the view
	view.render('research');
	
};
