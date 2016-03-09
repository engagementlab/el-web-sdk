/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * CommunityPlanIt registration API controller.
 *
 * Help: https://gist.github.com/JedWatson/9741171
 *
 * @class communityplanit
 * @author Johnny Richardson
 *
 * ==========
 */
var async = require('async'),
    keystone = require('keystone');

var CPIRegistration = keystone.list('CPIRegistration');


/**
 * Create a CPIRegistration
 */
exports.create = function(req, res) {
    
    var item = new CPIRegistration.model(),
        data = (req.method == 'POST') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {
        
        if (err) return res.apiError('error', err);
        
        res.apiResponse({
            cpiRegistration: item
        });
        
    });
};
