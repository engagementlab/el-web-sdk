/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Research projects directory view controller.
 * 
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 * 
 * @module research
 * @class directory
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var ProjectCategory = keystone.list('ProjectCategory');
var _ = require('underscore');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'directory';
	
	// Load research categories
	view.on('init', function(next) {
		
		var q = ProjectCategory.model.find({});
		
		q.exec(function(err, result) {
			_.map(result, function(cat) {

				// Get image code
				cat.image = cat._.image.format();
				cat.url = cat.key;

				console.log(cat.key)

				return cat;

			});

			locals.categories = result;
			next(err);
		});
		
	});

	// Render the view
	view.render('research/directory');
	
};
