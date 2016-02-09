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
var twitter = keystone.get('twitter');

if (!String.prototype.splice) {
    /**
     * {JSDoc}
     *
     * The splice() method changes the content of a string by removing a range of
     * characters and/or adding new characters.
     *
     * @this {String}
     * @param {number} start Index at which to start changing the string.
     * @param {number} delCount An integer indicating the number of old chars to remove.
     * @param {string} newSubStr The String that is spliced in.
     * @return {string} A new string with the spliced substring.
     */
    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}

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
                sort: { date: -1 }
            }).limit(3).exec(function(err, articleResult){
                if (err) throw err;
                locals.articles = articleResult;
            });

            locals.twitter = {};

            twitter.get('statuses/user_timeline.json?count=3', function(err, tweets, response) {
                
                if (err) throw error;

                locals.twitter.user = tweets[0].user.screen_name;
                locals.twitter.tweets = [];

                for (var i = 0; i < tweets.length; i++) {
                    
                    var tweet = tweets[i];
                    var html = tweet.text;
                    var entities = _.union(
                        tweet.entities.hashtags, 
                        tweet.entities.user_mentions, 
                        tweet.entities.urls);

                    entities = _.sortBy(entities, function(n) { return n.indices[0]; }).reverse();

                    for (var j = 0; j < entities.length; j++) {
                        var e = entities[j];
                        html = html.splice(e.indices[1], 0, "</a>");
                        if (e.text) {
                            // hashtag
                            html = html.splice(e.indices[0], 0, "<a href='https://twitter.com/hashtag/" + e.text + "/'>");
                        } else if (e.url) {
                            // link
                            html = html.splice(e.indices[0], 0, "<a href='" + e.url + "'>")
                        } else if (e.screen_name) {
                            // mention
                            html = html.splice(e.indices[0], 0, "<a href='https://twitter.com/" + e.screen_name + "/'>")
                        }
                    };
                    locals.twitter.tweets.push({ text: html });
                }
                next(err);
            });
        });
    });

    // Render the view
    view.render('news');

};
