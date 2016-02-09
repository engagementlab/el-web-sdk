/**
 * Engagement Lab Website
 * 
 * Person page parent Model
 * @module team
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;
var slack = require('../slack');

/**
 * @module team
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Person = new keystone.List('Person', 
	{
		label: 'People',
		singular: 'Team Member',
		sortable: true,
		track: true,
		autokey: { path: 'key', from: 'name', unique: true },
	});

/**
 * Model Fields
 * @main Person
 */
Person.add({

	name: { type: Types.Name, label: 'Name', required: true, initial: true, index: true },
	title: { type: String, label: 'Title', required: true, initial: true },
	bio: { type: Types.Markdown, label: 'Bio', required: true, initial: true },
	image: { type: Types.CloudinaryImage, label: 'Image', folder: 'site/team' },
	cmapPerson: { type: Types.Boolean, label: 'Show on CMAP page' },
  
  category: { type: Types.Select, options: 'leadership, team, fellows, students, alumni', default: 'team', required: true, initial: true },
	twitterURL: { type: Types.Url, label: 'Twitter' },	
	fbURL: { type: Types.Url, label: 'Facebook' },	
	linkedInURL: { type: Types.Url, label: 'LinkedIn' },	
	githubURL: { type: Types.Url, label: 'Github' },
	websiteURL: { type: Types.Url, label: 'Website' },	

	email: { type: String, label: 'Email' },
	phone: { type: String, label: 'Phone' },
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Hooks
 * =============
 */
Person.schema.pre('save', function(next) {

    // Save state for post hook
    this.wasNew = this.isNew;
    this.wasModified = this.isModified();

    next();

});

Person.schema.post('save', function(next) {

    // Make a post to slack when this Person is updated
    var person = this;
    
    slack.post(
    	Person.model, this, true, 
    	function() { return person.name.first + ' ' + person.name.last; }
    );

});


/**
 * Model Registration
 */
Person.defaultSort = 'sortOrder';
Person.defaultColumns = 'name, category';
Person.register();
