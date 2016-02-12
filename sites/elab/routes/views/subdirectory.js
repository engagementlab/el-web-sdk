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
    var getAll = req.params.subdirectory === 'all';

    // locals.section is used to set the currently selected
    locals.section = req.params.directory;
    locals.sub_section = req.params.subdirectory;

    view.on('init', function(next) {

        // Retrieves all listings for the input subdirectory
        var querySub = Subdirectory.model.findOne({
            key: req.params.subdirectory
        });

        querySub.exec(function(err, resultSub) {

            if (resultSub === null && !getAll)
                return res.notfound('Uh oh.', 'Sorry, but it looks like the fun stuff is missing (404)! Maybe go <a href="http://elab.emerson.edu/">back home</a>?');

            var projectFilter = { enabled: true };

            // TODO: Show all subdirs?
            if(!getAll) {
                projectFilter.subdirectory = resultSub;

                locals.name = resultSub.name;
                locals.lead = resultSub.description;
            }
            else
                locals.name = 'All';

            var queryProject = Project.model.find( projectFilter ).sort([
                ['sortOrder', 'ascending']
            ])
            .populate('subdirectory');

            queryProject.exec(function(err, resultProject) {

                _.map(resultProject, function(proj) {

                    // Get image code
                    proj.href = '/' + req.params.directory + 
                    '/' + proj.subdirectory.key + 
                    '/' + proj.key;
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