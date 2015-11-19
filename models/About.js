/**
 * Engagement Lab Website
 * 
 * About page Model
 * @module about
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
 */
var About = new keystone.List('About');

/**
 * Model Fields
 * @main About
 */
About.add({
	blurb: { type: String, label: 'About Blurb', required: true, initial: true },
	mission: { type: String, label: 'Mission', required: true, initial: true },
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
About.defaultSort = '-createdAt';
About.defaultColumns = 'createdAt';
About.register();
