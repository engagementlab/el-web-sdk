/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Jobs view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class team
 * @author Erica Sailing
 *
 * ==========
 */
var keystone = require('keystone');
var Job = keystone.list('Job');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'jobs';

    // Load all jobs
    view.on('init', function(next) {

        var queryJobs = Job.model.find({}).sort([
            ['sortOrder', 'ascending']
        ]);

        // Setup the locals to be used inside view
        queryJobs.exec(function(err, resultJob) {
            locals.job = resultJob;

            next(err);
        });

    });

    // Render the view
    view.render('jobs');

};
