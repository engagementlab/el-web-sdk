/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Job view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class team
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Job = keystone.list('Job');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'job';

    // Load all team members and sort/categorize them 
    view.on('init', function(next) {

        var queryJobs = Job.model.find({}).sort([
            ['sortOrder', 'ascending']
        ]);
        // var categorize = function(val, cat) {
        //     return val.filter(function(item) {
        //         return item.category == cat;
        //     });
        // };

        // Setup the locals to be used inside view
        queryJobs.exec(function(err, resultJob) {
            locals.job = resultJob;
            // console.log (locals.job);
            // console.log (err);

            // locals.leadership = categorize(result, 'leadership');
            // locals.team  = categorize(result, 'team');
            // locals.fellows = categorize(result, 'fellows');
            // locals.students = categorize(result, 'students');
            // locals.alumni = categorize(result, 'alumni');

            next(err);
        });

    });

    // Render the view
    view.render('job');

};
