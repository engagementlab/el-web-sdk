/**
 * Engagement Lab Website
 * 
 * About page Model
 * @module about
 * @class about
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module about
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var About = new keystone.List('About', 
	{
		label: 'About Page',
		singular: 'About Page',
		track: true,
		// nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main About
 */
About.add({
	name: { type: String, default: "About Page", hidden: true, required: true, initial: true },
	missionStatement: { type: Types.Textarea, label: "Mision Statement", required: true },
	history1: { type: Types.Textarea, label: "History Paragraph 1", required: true },
	history2: { type: Types.Textarea, label: "History Paragraph 2", required: true },
	history3: { type: Types.Textarea, label: "History Paragraph 3", required: true },
	history4: { type: Types.Textarea, label: "History Paragraph 4", required: false },
	historyImages: {
		type: Types.CloudinaryImages,
		label: 'History Images (Please use 6 images)',
		folder: 'site/about',
		autoCleanup: true
	},
	process: { type: Types.Textarea, label: "Process and Approach", required: true },
	
	collaborate: { type: Types.Textarea, label: "Collaborate With Us", required: true },
	studentsResearchers: { type: Types.Textarea, label: "Students and Researchers", required: true },
	clientsConsulting: { type: Types.Textarea, label: "Clients and Consulting", required: true },
	partnerships: { type: Types.Textarea, label: "Community Based Partnerships", required: true },
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
About.defaultSort = '-createdAt';
About.defaultColumns = 'name, updatedAt';
About.register();
