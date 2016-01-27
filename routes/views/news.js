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
var Resource = keystone.list('Resource');
var _ = require('underscore');

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
            _.each(locals.news, function(post){
                post.content = post.content.replace(/(^(By)\s+(.*)?[0-9]\s)/, '');
            });

            locals.featured = newsData.news.shift();
            locals.events = newsData.events;

            // Show the 3 most recently added articles
            Resource.model.find({ type: 'article' }, {}, {
                sort: { 'createdAt': -1 }
            }).limit(3).exec(function(err, articleResult){
                if (err) throw err;
                locals.articles = articleResult;
            });

            next(err);
        });
    });

    // Render the view
    view.render('news');

};
