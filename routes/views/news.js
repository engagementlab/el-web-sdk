/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * News/blog page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class news
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');

// News data propagated by ./jobs/news
var store = require('json-fs-store')('./tmp');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'news';

    // Load current news content
    view.on('init', function(next) {

        store.load('newsContent', function(err, newsData) {

            // err if JSON parsing failed
            if(err) throw err;

            locals.news = newsData.news;
            locals.events = newsData.events;

            next(err);

        });

    });

    // Render the view
    view.render('news');

};
