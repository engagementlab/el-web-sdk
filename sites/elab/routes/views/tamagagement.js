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
var TamaComment = keystone.list('TamaComment');
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
                setLocals(result);
                callback(result);
            });
        });
    }

    function setLocals(model) {
        var mood = behavior.getMood(model);
        locals.mood = mood.id;
        locals.message = mood.message;
        locals.actions = mood.actions;
    }

    // Make any queries
    view.on('init', function(next) {

        Tamagagement.model.findOne({}, {}, {}).exec(function(err, result) {

            if (err) throw err;
            setLocals(result);
            next();
        });
    });

    view.on('init', function(next) {
        TamaComment.model.find({},{}, {
            sort: { createdAt: -1 }
        }).limit(5).exec(function(err, result){

            if (err) throw err;
            locals.comments = result;

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
        update('health', 100, function(val){
            next();
        });
    });

    view.on('post', { action: 'comment.create' }, function(next) {
        var body = req.body;
        var newComment = new TamaComment.model({
            author: body.author,
            content: body.content
        });
        
        var updater = newComment.getUpdateHandler(req);
        updater.process(req.body, {
            flashErrors: true,
            logErrors: true
        }, function(err) {
            if (err) throw err;
            return res.redirect('/tamagagement');
            next();
        })
    });

    // Render the view
    view.render('tamagagement');

};
