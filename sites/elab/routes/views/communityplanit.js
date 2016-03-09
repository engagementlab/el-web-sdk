/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * CommunityPlanIt registration page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class communityplanit
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var CPIContent = keystone.list('CPIContent');
var CPIPartner = keystone.list('CPIPartner');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

        locals.section = 'commmunityplanit:boston';

    view.on('init', function(next) {

        var queryCPI = CPIContent.model.findOne({}, {}, {
            sort: {
                'createdAt': -1
            }
        });

        queryCPI.exec(function(err, resultCPI) {

            locals.content = resultCPI;

            var queryPartners = CPIPartner.model.find({}).sort([
                ['sortOrder', 'ascending']
            ]);

            queryPartners.exec(function(err, resultPartners) {
                locals.partners = resultPartners;
                next(err);
            });
        });
    });

    // Render the view
    view.render('communityplanit');

};
