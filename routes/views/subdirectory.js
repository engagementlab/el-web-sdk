/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Subdirectory view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class subdirectory
 * @static
 * @author Jay Vachon
 *
 * ==========
 */
var keystone = require('keystone');
var Subdirectory = keystone.list('Subdirectory');
var Project = keystone.list('Project');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    locals.section = req.params.directory;
    locals.sub_section = req.params.subdirectory;

    Subdirectory.model.findOne({key: req.params.subdirectory}, function(err, sub) { 
        locals.name = sub.name;
        locals.lead = sub.lead;
        return sub; 
    });

    view.on('init', function(next) {
    	
    	var querySub = Subdirectory.model.findOne({key: req.params.subdirectory});

    	querySub.exec(function(err, resultSub) {
    	    
    		var queryProject = Project.model.find({
    			'child_content.subdirectory': resultSub
    		});

    		queryProject.exec(function(err, resultProject) {
    			_.map(resultProject, function(proj) {

    	            // Get image code
    	            proj.image = proj._.image.format();
    	            proj.href = '/' + req.params.directory + '/' + proj.key;
    	            proj.description = proj.description;

    	            return proj;

    	        });

	    		locals.listings = resultProject;
	    		next(err);
    		});

    	});
    });

    // Render the view
    view.render('subdirectory');
};