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
 * @author Jay Vachon
 *
 * ==========
 */
var keystone = require('keystone');
var Directory = keystone.list('Directory');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = req.params.key;

    // Load research categories and sort them
    view.on('init', function(next) {

        var q = Directory.model.find({}).sort([
            ['sortOrder', 'ascending']
        ]);

        q.exec(function(err, result) {
            _.map(result, function(cat) {

                // Get image code
                // cat.image = cat._.image.format();
                // cat.href = '/' + req.params.key + '/' + cat.key;

                return cat;

            });

            // locals.listings = result;
            locals.title="test";
            locals.description="ok now";
            next(err);
        });


    });

    // Render the view
    view.render('directory');

};
