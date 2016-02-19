/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * CMAP page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class cmap
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Academics = keystone.list('Academics');
var Person = keystone.list('Person');
var Project = keystone.list('Project');
var Cmap = keystone.list('Cmap');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'programs';

    // CMAP query
    view.on('init', function(next) {

        var cmapQuery = Cmap.model.findOne({}, {}, {
            sort: { 'createdAt': -1 }
        });

        cmapQuery.exec(function(err, result) {

            // Get page elements
            locals.cmap = result;
            locals.elements = [];
            for (var i = 0; i < result.headers.length; i++) {
                locals.elements.push({
                    header: result.headers[i],
                    subheader: result.subheaders[i],
                    element: result.elements[i]
                });
            }

            next(err);
        });

    });

    view.on('init', function(next) {

        // Get faculty
        Person.model.find({ 'cmapPerson': true })
        .sort([
            ['sortOrder', 'ascending']
        ])
        .exec(function(err, result) {
            locals.people = result;

            next(err);
        });

    });

    view.on('init', function(next) {

        // Get projects flagged for CMAP
        Project.model.find({
            'enabled': true,
            'cmapProject': true
        })
        .sort([
            ['sortOrder', 'ascending']
        ])
        .populate('subdirectory')
        .exec(function(err, resultProject) {
            _.map(resultProject, function(proj) {

                // Create link
                proj.href = '/projects' +
                '/' + proj.subdirectory.key + 
                '/' + proj.key;
                proj.description = proj.description;

                return proj;

            });

            locals.projects = resultProject;
            next(err);

        });
    
    });

    // Render the view
    view.render('cmap');

};
