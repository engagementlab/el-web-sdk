/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Home page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class index
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Project = keystone.list('Project');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';

    // Make any queries
    view.on('init', function(next) {

        // This query gets all featured projects
        var projectQuery = Project.model.find({
            featured: true
        });

        // Setup the locals to be used inside view
        projectQuery.exec(function(err, result) {

           /* _.each(result, function(r) {
                if (r.headerImages.length > 0)
                    r.headerImage = r.headerImages[0];
            });*/

            locals.featured_projects = result;

            next(err);
        });

    });

    // Render the view
    view.render('index');

};
