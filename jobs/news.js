/* 
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
==============
 news.js
 Blog and events (news) retrieval job.

 Created by Johnny Richardson on 12/15/15.
==============
*/

/**
  .
  @class news
  @namespace jobs
  @constructor
  @static
**/
var _ = require('underscore');

// HTTP requester
var request = require('request');
// RSS reader
var feed = require("feed-read");
// File manipulation
var store = require('json-fs-store')('./tmp');

var embedlyKey = '6854c1facf7a4eb6bdfe5bbd663ced50';

var eventsParams = {
    host: 'http://eventbriteapi.com',
    path: '/v3/users/me/owned_events/?token=HC62RVWGRYQNBDLBNVFQ&status=live'
};
var blogParams = {
    host: 'https://medium.com',
    path: '/feed/@Engagement_Lab'
};

var fileContent = {
    id: 'newsContent',
    news: [],
    events: []
};

// Get events
request(eventsParams.host + eventsParams.path, function(error, response, body) {

    if (!error && response.statusCode == 200)
        fileContent.events = JSON.parse(body).events;

    // Next get Medium RSS feed
    feed(blogParams.host + blogParams.path, function(err, rss) {

        var articles = [];

        // Output data after all articles retrieved via embedly
        var queryDone = _.after(rss.length, function() {
            fileContent.news = articles;
            
            // Store as json
            store.add(fileContent, function(err) {
                // err if the save failed
                if (err) throw err;
            });
        });        

        // Retrieve article's embed via embedly
        _.each(rss, function(article) {

            request('http://api.embed.ly/1/extract?key=' + embedlyKey + '&url=' + article.link, function(error, response, articleBody) {

                var articleJson = JSON.parse(articleBody);

                // Form data for template 
                articles.push({
                                content: articleJson.description,
                                title: articleJson.title,
                                published: articleJson.published,
                                author: articleJson.authors[0].name,
                                image: articleJson.images[0].url,
                                url: articleJson.url 
                            });
                
                queryDone();

            });
            
        });

    });

});