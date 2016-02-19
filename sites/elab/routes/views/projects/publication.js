/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Publications directory view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @module research
 * @class publication
 * @static
 * @author Jay Vachon
 *
 * ==========
 */
var keystone = require('keystone');
var moment = require('moment');
var Publication = keystone.list('Publication');
var Resource = keystone.list('Resource');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Init locals
    locals.section = 'research';
    locals.sub_section = 'publications';

    // Load the current publication
    view.on('init', function(next) {

        /* This query gets a publication by the key in the
           URL and populates resources from its model */
        var publicationQuery = Publication.model.findOne({
            key: req.params.publication_key
        }).populate('videos articles files');

        // Setup the locals to be used inside view
        publicationQuery.exec(function(err, result) {
            
            if (result === null) {
                return res.notfound('Cannot find publication', 'Sorry, but it looks like the publication you were looking for does not exist! Try <a href="http://elab.emerson.edu/research/publications">going back</a> to the directory.');
            }

            locals.date = moment(result.date).format();
            locals.publication = result;

            next(err);
        });
    });

    // Render the view
    view.render('projects/publication');

};