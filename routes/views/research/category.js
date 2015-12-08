/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Research projects category view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @module research
 
 * @class category
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var Category = keystone.list('Category');
var _ = require('underscore');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;
    var viewPublications = req.params.category == 'publications';

    locals.projects = [];
    locals.category = {};

    locals.filters = {
        _category: req.params.category
    };

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'category';
    locals.sub_section = req.params.category;

    // Get all project categories
    var getCategory = function(next) {

        var Project = keystone.list('Project');
        var queryCategory = Category.model.findOne({
            key: locals.filters._category
        });

        queryCategory.exec(function(err, resultCategory) {

            var queryProjects = Project.model.find({
                category: resultCategory
            });
            queryProjects.exec(function(err, resultProjects) {

                locals.projects = resultProjects;
                locals.category = resultCategory;

                next(err);
            });

        });

    }

    // Get all publications
    var getPublications = function(next) {

        var Publication = keystone.list('Publication');
        var categories = Publication.schema.paths.category.enumValues;

        var queryPubs = Publication.model.find({}).populate('subCategory');
        var queryCategory = Category.model.findOne({
            key: "publications"
        });

        queryCategory.exec(function(err, resultCategory) {

            queryPubs.exec(function(err, resultPubs) {

                locals.publications = {};
                locals.category = resultCategory;

                _.each(categories, function(category) {

                    // Filter publication by their category
                    var filteredPubs = resultPubs.filter(function(pub) {
                        return pub.category == category;
                    });
                    // Get any sub-sections
                    var subSections = _.pluck(filteredPubs, 'subCategory');

                    // Assemble publications along with applicable sections
                    locals.publications[category] = {
                        records: filteredPubs
                    };

                    // Assign subsections, if any
                    if (subSections[0] !== null && subSections.length > 0)
                        locals.publications[category].sub_sections = _.uniq(subSections);

                });

                next(err);

            });

        });
    }

    // Load category and category's projects
    view.on('init', function(next) {

        if (viewPublications)
            getPublications(next);
        else
            getCategory(next);

    });

    // Render the view
    if (locals.filters._category == 'publications')
        view.render('research/publications');
    else
        view.render('research/category');

};