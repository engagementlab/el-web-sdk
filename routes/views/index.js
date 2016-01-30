/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Home page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class index
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Project = keystone.list('Project');
var Resource = keystone.list('Resource');
var _ = require('underscore');

// News data propagated by ./jobs/news
var store = require('json-fs-store')('./tmp');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';

    // Make any queries
    view.on('init', function(next) {

        locals.featured_content = [];

        // This query gets all featured projects
        var projectQuery = Project.model.find({
            'enabled': true,
            'featured': true
        })
        .populate('subdirectory');

        // Setup the locals to be used inside view
        projectQuery.exec(function(err, result) {
            if (err) throw err;
            locals.featured_projects = result;
        });

        store.load('newsContent', function(err, newsData) {

            // err if JSON parsing failed
            if(err) throw err;

            var news = newsData.news[0];
            var content = news.content.replace(/(^(By)\s+(.*)?[0-9]\s)/, ''); // removes the byline

            locals.featured_content[0] = {
                date: news.published,
                title: news.title.replace('[VIDEO]', ''), // TODO: might need more sanitation of the title
                content: content,
                url: news.url,
                type: "blog"
            };
            
            if(newsData.events.length > 0) {
                var events = newsData.events[0];
                locals.featured_content[1] = {
                    title: events.name.text,
                    content: events.description.text,
                    url: events.url,
                    type: "event"
                };
            }

            Resource.model.findOne({ type: 'article' }, {}, {
                sort: { 'createdAt': -1 }
            }).exec(function(err, result) {
                locals.featured_content[2] = {
                    title: result.name,
                    content: result.summary,
                    url: result.url,
                    type: "article"
                };
            });

            next(err);
        });

    });

    // Render the view
    view.render('index');

};
