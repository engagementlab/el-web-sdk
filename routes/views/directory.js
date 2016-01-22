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
var Program = keystone.list('Program');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    locals.section = req.params.directory;

    // TODO: might be excessive (are we really going to have subdirectory filters?)
    locals.filters = {
        _directory: req.params.directory
    };

    // Load research categories and sort them
    view.on('init', function(next) {

        var queryDirectory = Directory.model.findOne({key: req.params.directory});

        queryDirectory.exec(function(err, resultDirectory) {
            
            if (resultDirectory === null) {
                return res.status(404).send(keystone.wrapHTMLError('Good golly gosh darn dang darnit! No page here (404)'));
            }

            locals.name = resultDirectory.name;
            locals.lead = resultDirectory.lead;

            // Special case: Programs page behaves like a directory, but listings are "Programs" rather than "Subdirectories"
            var queryListing;
            if (req.params.directory == 'programs') {
                queryListing = Program.model.find({});
            } else {
                queryListing = Subdirectory.model.find({
                    'directory': resultDirectory
                });
            }

            queryListing.sort([
                ['sortOrder', 'ascending']
            ]);
            
            queryListing.exec(function(err, resultSubdirectory) {
                _.map(resultSubdirectory, function(sub) {

                    // Get image code
                    sub.href = (sub.href === undefined) ? '/' + req.params.directory + '/' + sub.key : sub.href;
                    sub.description = sub.description;

                    return sub;

                });

                locals.listings = resultSubdirectory;
                next(err);
            });
        });
    });

    // Render the view
    view.render('directory');

};
