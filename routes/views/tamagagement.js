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

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    // moods:
    // sleeping, normal, bored, dead, happy, heartbroken, sad

    // Make any queries
    view.on('init', function(next) {

        var mood = 'normal';
        var hour = new Date().getHours();
        
        if (hour > 22 || hour < 9) {
            mood = 'sleeping';
        }

        var msg = '';
        switch(mood) {
            case 'normal': msg = 'Errol is feeling pretty normal today!'; break;
            case 'sleeping': msg = 'SHHH!!! Errol\'s sleeping. Keep it down silly ;)'; break;
        }

        locals.mood = mood;
        locals.message = msg;

        next();
    });

    view.on('post', { action: 'tama.set_mood' }, function(next) {
        console.log("hey :)");
    });

    // Render the view
    view.render('tamagagement');

};
