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
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = req.params.directory;
    locals.sub_section = req.params.subdirectory;

    Subdirectory.model.findOne({key: req.params.subdirectory}, function(err, dir) { 
        locals.name = dir.name;
        locals.lead = dir.lead;
        return dir; 
    });

    /*view.on('init', function(next) {

    }*/

    // Render the view
    view.render('subdirectory');
};