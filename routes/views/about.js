/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * About page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class about
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var About = keystone.list('About');
var Partner = keystone.list('Partner');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'about';

    view.on('init', function(next) {

        var queryAbout = About.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });

        queryAbout.exec(function(err, resultAbout) {

            locals.about = resultAbout;

            var queryPartners = Partner.model.find({}).sort([
                ['sortOrder', 'ascending']
            ]);

            queryPartners.exec(function(err, resultPartners) {
                locals.partners = resultPartners;
                next(err);
            });
        });
    });

    // Render the view
    view.render('about');

};
