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
var Tamagagement = keystone.list('Tamagagement');
var moment = require('moment');
var behavior = keystone.get('tamabehavior');


exports = module.exports = function(req, res) {


    var view = new keystone.View(req, res);
    var locals = res.locals;

    function update(field, value, callback) {
        Tamagagement.model.findOne({}, {}, {}).exec(function(err, result) {
            result[field] = Math.max(0, Math.min(100, result[field] + value));
            result.save(function(err) {
                if (err) throw err;

                var mood = behavior.getMood(result);
                locals.mood = mood.id;
                locals.message = mood.message;
                locals.actions = mood.actions;

                console.log(field + ", " + result[field] + " .. " + value);
                callback(result[field]);
            });
        });
    }

    // Make any queries
    view.on('init', function(next) {

        Tamagagement.model.findOne({}, {}, {}).exec(function(err, result) {

            if (err) throw err;

            var mood = behavior.getMood(result);

            locals.mood = mood.id;
            locals.message = mood.message;
            locals.actions = mood.actions;

            next();
        });
    });

    view.on('post', { action: 'punch' }, function(next) {
        update('health', -50, function(val){
            next();
        });
    });

    view.on('post', { action: 'heal' }, function(next) {
        update('health', 50, function(val){
            next();
        });
    });

    view.on('post', { action: 'tickle' }, function(next) {
        update('happiness', 25, function(val){
            next();
        });
    });

    view.on('post', { action: 'insult' }, function(next) {
        update('happiness', -25, function(val){
            next();
        });
    });

    view.on('post', { action: 'revive' }, function(next) {
        behavior.doAction('revive');
        next();
    });

    // Render the view
    view.render('tamagagement');

};
