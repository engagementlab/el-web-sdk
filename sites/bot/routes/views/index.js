/**
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
 * ==============
 * Home page view controller.
 *
 * Help: http://keystonejs.com/docs/getting-started/#routesviews-firstview
 *
 * @class index
 * @static
 * @author Johnny Richardson
 *
 * ==========
 */
var keystone = require('keystone');
var _ = require('underscore');
var slack = keystone.get('slack');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // locals.section is used to set the currently selected
    // item in the header navigation.
    locals.section = 'home';

    view.on('init', function(next) {

	    slack.GetUsers(function(users) { 

	    	// console.log(users)

	    	var slackUsers = _.pluck(users, 'name');
	    	console.log(slackUsers)
	    	locals.users = slackUsers;

	    	next();

	    });

	  });

    // Render the view
    view.render('index');

};
