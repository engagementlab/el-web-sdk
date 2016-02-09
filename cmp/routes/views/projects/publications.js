/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Research projects directory view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @module research
 * @class publications
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Publication = keystone.list('Publication');
var Subdirectory = keystone.list('Subdirectory');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'publications';

    // Load publications categories and sort them
    view.on('init', function(next) {

        var querySub = Subdirectory.model.findOne({key: 'publications'});

        querySub.exec(function(err, resultSub) {

            if (resultSub === null)
                return res.notfound('Cannot find directory', 'Sorry, but it looks like something went awry! Try <a href="http://elab.emerson.edu/research">going back</a> to research.');

            locals.name = resultSub.name;
            locals.lead = resultSub.description;

            var categories = Publication.schema.paths.category.enumValues;
            var subcategories = Publication.model.find({}).populate('subCategory');

            subcategories.exec(function(err, resultPubs) {

                locals.publications = {};
                locals.category = resultPubs;

                _.each(categories, function(category) {

                    // Filter publication by their category
                    var filteredPubs = resultPubs.filter(function(pub) {
                        return pub.category == category;
                    });
                    
                    if(category === 'Article') {
                        // Sort articles by date
                        filteredPubs = filteredPubs.sort(function(a, b) {
                            return new Date(b.date) - new Date(a.date);
                        });
                    }

                    _.map(filteredPubs, function(pub) {
                        pub.href = '/publications/' + pub.key;
                        return pub;
                    });

                    // Get any sub-sections
                    var subSections = _.pluck(filteredPubs, 'subCategory');

                    // Assemble publications along with applicable sections
                    locals.publications[category] = {
                        records: filteredPubs,
                        isJournal: (category === 'Article')
                    };
                    

                    // Assign subsections, if any
                    if (subSections[0] !== null && subSections.length > 0)
                        locals.publications[category].sub_sections =
                            _.uniq(subSections);

                });

                next(err);
            });
        });
    });

    // Render the view
    view.render('projects/publications');

};