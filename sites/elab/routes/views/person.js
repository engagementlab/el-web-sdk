/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2016
 * ==============
 * Person bio view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class team
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Person = keystone.list('Person');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'person';
    locals.filters = {
        _key: req.params.person
    };

    // Load all team members and sort/categorize them 
    view.on('init', function(next) {

        var q = Person.model.find({}).sort([
            ['sortOrder', 'ascending']
        ]);

        // Get all people but also get index of the selected person
        q.exec(function(err, result) {

            var thisPerson = _.find(result, function(thisPerson) { 
                                 return thisPerson.key === locals.filters._key; 
                             });
            var personInd = _.indexOf(result, thisPerson);

            locals.people_bios = result;
            locals.starting_index = personInd;

            next(err);

        });

    });

    // Render the view
    view.render('person');

};
