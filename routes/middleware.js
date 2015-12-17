/* 
	Engagement Lab Website 
*/
/**
 * Route middleware
 * This file contains the common middleware used by all routes. Extend or replace these functions as the application requires.
 *
 * @class middleware
 * @namespace routes
 * @author Johnny Richardson
 * @constructor
 * @static
 **/

var keystone = require('keystone');
var _ = require('underscore');

/** 
	DB Models for use on nav (cached query)
*/
var Category = keystone.list('Category');

var queryCategory = Category.model.find({});
queryCategory.where('isProjectCategory', true);
queryCategory.select('key name');

/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {

    var locals = res.locals;

    queryCategory.lean();
    queryCategory.exec(function(err, resultCategory) {

        var researchSub = _.map(resultCategory, function(cat) {

            return {
                label: cat.name,
                key: cat.key,
                href: '/research/' + cat.key
            };

        });

        locals.navLinks = [{
            label: 'About',
            key: 'about',
            href: '/about'
        }, {
            label: 'Research',
            key: 'research',
            href: '/research',
            subLinks: researchSub
        }, {
            label: 'Academics',
            key: 'academics',
            href: '/academics'
        }, {
            label: 'People',
            key: 'people',
            href: '/people'
        }, {
            label: 'Programs',
            key: 'programs',
            href: '/programs'
        }, {
            label: 'News',
            key: 'news',
            href: '/news'
        }];

        locals.user = req.user;

        next();

    });

};

/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {

    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };

    res.locals.messages = _.any(flashMessages, function(msgs) {
        return msgs.length;
    }) ? flashMessages : false;

    next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {

    if (!req.user) {
        req.flash('error', 'Please sign in to access this page.');
        res.redirect('/keystone/signin');
    } else {
        next();
    }

};