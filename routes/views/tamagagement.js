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
var Tamagagement = keystone.get('Tamagagement');
var About = keystone.get('About');
var moment = require('moment');
var behavior = keystone.get('tamabehavior');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Make any queries
    view.on('init', function(next) {

        // Tamagagement.model.findOne({}, {}, {}).exec(function(err, result) {

            var mood = behavior.getMood('result');

            locals.mood = mood.id;
            locals.message = mood.message;
            locals.actions = mood.actions;

            next();
        // });
    });

    view.on('post', { action: 'punch' }, function(next) {
        behavior.doAction('punch');
        next();
    });

    view.on('post', { action: 'tickle' }, function(next) {
        behavior.doAction('tickle');
        next();
    });

    view.on('post', { action: 'insult' }, function(next) {
        behavior.doAction('insult');
        next();
    });

    view.on('post', { action: 'revive' }, function(next) {
        behavior.doAction('revive');
        next();
    });

    // Render the view
    view.render('tamagagement');

};
