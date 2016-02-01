/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Tamagagement Ghost view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class index
 * @static
 * @author Jay Vachon
 *
 * ==========
 */
var keystone = require('keystone');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Make any queries
    view.on('init', function(next) {
        next();
    });

    // Render the view
    view.render('tamagagement');

};
