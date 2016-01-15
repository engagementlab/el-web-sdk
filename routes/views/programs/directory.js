/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Programs directory view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @module programs
 * @class directory
 * @static
 * @author Jay Vachon
 *
 * ==========
 */
var keystone = require('keystone');
var Program = keystone.list('Program');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'programs';

    // Load programs categories and sort them
    view.on('init', function(next) {

        var q = Program.model.find({}).sort([
            ['sortOrder', 'ascending']
        ]);

        q.exec(function(err, result) {
            
            _.map(result, function(cat) {

                // Get image code
                cat.image = cat._.image.format();
                cat.href = cat.externalLinkUrl;

                return cat;

            });

            locals.listings = result;
            next(err);
        });

        

    });

    // Render the view
    view.render('directory', {
        title: "Programs",
        lead: "Lorem pipsum dolor sit amet! consectetur? adipisicing elit Illo quaerat commodi excepturi? DIGNISSIMOS!!!!!"
    });

};
