/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * About page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class about
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var About = keystone.list('About');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'about';

    // Load the current project
    view.on('init', function(next) {

        var q = About.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });

        q.exec(function(err, result) {
            locals.about = result;

            next(err);
        });

    });

    // Render the view
    view.render('about');

}