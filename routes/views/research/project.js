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
    locals.section = req.params.directory;
    locals.sub_section = req.params.subdirectory;

    locals.filters = {
        _key: req.params.project_key
    };

    // Load the current project
    view.on('init', function(next) {

        /* This query gets a project by the key in the
           URL and populates resources from its model */
        var projectQuery = Project.model.findOne({
            'enabled': true,
            key: locals.filters._key
        }).populate('videos articles files');

        // Setup the locals to be used inside view
        projectQuery.exec(function(err, result) {
            
            if (result === null) {
                return res.notfound('Cannot find project', 'Sorry, but it looks like the research project you were looking for does not exist! Try <a href="http://elab.emerson.edu/research">going back</a> to research.');
            }

            // Project is the listing, projectData is the content
            locals.project = result;

            // Format dates
            locals.projectDates = result._.startDate.format('MMMM Do YYYY - ') +
                                  ((result.endDate === undefined) ?
                                  'Current' : result._.endDate.format('MMMM Do YYYY'));

            // Determine project tabs to be active by default (images are first if defined)
            if(!result.projectImages.length > 0) {

                locals.videosTabFirst = ( result.videos.length > 0 ); 
                locals.filesTabFirst = ( !locals.videosTabFirst && result.files.length > 0 ); 
                locals.customTabsFirst = ( !locals.videosTabFirst && !locals.filesTabFirst );

            }

            next(err);
        });
    });

    // Render the view
    view.render('research/project');

};