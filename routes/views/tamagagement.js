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
var moment = require('moment');
var tamagagement = keystone.get('tamagagement');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Make any queries
    view.on('init', function(next) {

        var mood = tamagagement.getMood();

        locals.mood = mood.id;
        locals.message = mood.message;
        locals.actions = mood.actions;

        next();
    });

    view.on('post', { action: 'tama.set_mood' }, function(next) {
        console.log("hey :)");
    });

    // Render the view
    view.render('tamagagement');

};
