/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2016
 * ==============
*/

 /**
 * Blog and events (news) retrieval job. Requires setup of Eventbrite API account. Should be run as cron task via grunt/execute.
 * 
 * ### Examples:
 *
 *    // Runs news job every hour from 9a-10p M-F
 *    0 9-22 * * 1-5 /srv/website/grunt news >/dev/null 2>&1
 *
 *
 * @class Jobs
 * @name jobs/news
 */
'use strict';

require('dotenv').load({path: __dirname + '/../.env'});
var _ = require('underscore');

// HTTP requester
var request = require('request');
// RSS reader
var feed = require("feed-read");
// File manipulation
var store = require('json-fs-store')(__dirname + '/../tmp');

var embedlyKey = process.env.EMBEDLY_API_KEY;

var eventsParams = {
    host: 'http://eventbriteapi.com',
    path: '/v3/users/me/owned_events/?token=' + process.env.EVENTBRITE_TOKEN + '&status=live'
};
var blogParams = {
    host: 'https://medium.com',
    path: '/feed/engagement-lab-emerson-college'
};

var fileContent = {
    id: 'newsContent',
    news: [],
    events: []
};

// Get events
request(eventsParams.host + eventsParams.path, function(error, response, body) {

    if (!error && response.statusCode == 200) {
        var arrEvents = JSON.parse(body).events;

        // Cap events saved at 5
        var arrEventsCapped = _.reject(arrEvents, 
                                       function(e) { return _.indexOf(arrEvents, e) > 4 }
                                      );
        fileContent.events = arrEventsCapped;
    }

    // Next get Medium RSS feed
    feed(blogParams.host + blogParams.path, function(err, rss) {

        var articles = [];
        var articleInd = 0;

        // Output data after all articles retrieved via embedly
        var queryDone = _.after(rss.length, function() {
            
            let sortedNews = _.sortBy(articles, 'published').reverse();
            fileContent.news = sortedNews;

            // Store as json
            store.add(fileContent, function(err) {
                // err if the save failed
                if (err) throw err;
            });
        });        

        // Get embed data for article
        const getEmbed = function(article) {

            request('http://api.embed.ly/1/extract?key=' + embedlyKey + '&url=' + article.link, function(error, response, articleBody) {

                if(error)
                    throw new Error(error);
                else if(response.statusCode !== 200)
                    throw new Error("Unable to get data from embedly!");

                var articleJson = JSON.parse(articleBody);
                var data =  {
                                content: articleJson.description,
                                title: articleJson.title.replace(' - Engagement Lab @ Emerson College', ''),
                                published: articleJson.published,
                                author: articleJson.authors[0].name,
                                url: articleJson.url 
                            };
                if(articleJson.images && articleJson.images.length > 0)
                    data.image = articleJson.images[0].url;

                // Form data for template 
                articles.push(data);
                
                queryDone();

                if(articleInd < rss.length-1) {
                    articleInd++;
                    // Get next article
                    getEmbed(rss[articleInd]);
                }

            });
            
        };

        // Retrieve first article's embed via embedly;
        // This method will then retrieve all subsequent ones
        getEmbed(rss[0]);

    });

});