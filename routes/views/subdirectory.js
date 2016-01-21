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

    view.on('init', function(next) {

        console.log('init')
        var querySub = Subdirectory.model.findOne({key: req.params.subdirectory});

        querySub.exec(function(err, resultSub) {


            if (resultSub === null) {
                return res.status(404).send(keystone.wrapHTMLError('Oh ho ho ho no! 404 error: no page to render here :('));
            }

            locals.name = resultSub.name;
            locals.lead = resultSub.description;

            var queryProject = Project.model.find({
                'enabled': true,
                'subdirectory': resultSub
            }).sort([
                ['sortOrder', 'ascending']
            ]);

            queryProject.exec(function(err, resultProject) {
                _.map(resultProject, function(proj) {

                // Get image code
                proj.href = '/' + req.params.directory + 
                '/' + req.params.subdirectory + 
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