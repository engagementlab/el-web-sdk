/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Directory view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class directory
 * @static
 * @author Jay Vachon
 *
 * ==========
 */
var keystone = require('keystone');
var Directory = keystone.list('Directory');
var Subdirectory = keystone.list('Subdirectory');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    locals.section = req.params.directory;

    Directory.model.findOne({key: req.params.directory}, function(err, dir) { 

        // locals.section is used to set the currently selected
        locals.name = dir.name;
        locals.lead = dir.lead;
        return dir; 
    });

    // TODO: might be excessive (are we really going to have subdirectory filters?)
    locals.filters = {
        _directory: req.params.directory
    };

    // Load research categories and sort them
    view.on('init', function(next) {

        /*var Project = keystone.list('Project');
        var queryCategory = Category.model.findOne({
            key: locals.filters._category
        });

        queryCategory.exec(function(err, resultCategory) {

            // Get projects for selected category that are enabled
            var queryProjects = Project.model.find({
                enabled: true,
                category: resultCategory
            });
            queryProjects.exec(function(err, resultProjects) {

                locals.projects = resultProjects;
                locals.category = resultCategory;

                next(err);
            });

        });*/

        var queryDirectory = Directory.model.findOne({key: req.params.directory});

        queryDirectory.exec(function(err, resultDirectory) {
            
            var querySubdirectory = Subdirectory.model.find({
                'child_content.directory': resultDirectory
            });

            querySubdirectory.exec(function(err, resultSubdirectory) {
                _.map(resultSubdirectory, function(sub) {

                    // Get image code
                    sub.image = sub._.image.format();
                    sub.href = '/' + req.params.directory + '/' + sub.key;
                    sub.description = sub.description;

                    return sub;

                });

                locals.listings = resultSubdirectory;
                next(err);
            });
        })

       /* var q = Directory.model.findOne({'directory.type': 'research'}).sort([
            ['sortOrder', 'ascending']
        ]);

        q.exec(function(err, result) {
            _.map(result, function(sub) {
                console.log(sub);
                return sub;
            });

            locals.listing = result;
            next(err);
            console.log(result);
            next(err);
        });*/

    });

    // Render the view
    view.render('directory');

};
