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
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main About
 */
About.add({
	name: { type: String, default: "About Page", hidden: true, required: true },
	history1: { type: String, label: "History Paragraph 1", required: true, initial: true, index: true },
	history2: { type: String, label: "History Paragraph 2", required: true, initial: true, index: true },
	history3: { type: String, label: "History Paragraph 3", required: true, initial: true, index: true },
	historyImages: {
	    type: Types.CloudinaryImages,
	    label: 'History Images (Choose 6)',
	    folder: 'site/about',
	    autoCleanup: true
	},
	process: { type: String, label: "Process and Approach", required: true, initial: true, index: true },
	collaborate: { type: String, label: "Collaborate With Us", required: true, initial: true, index: true },
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
About.defaultSort = '-createdAt';
About.defaultColumns = 'name';
About.register();
