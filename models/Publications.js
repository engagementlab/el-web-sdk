/**
 * Engagement Lab Website
 * 
 * Publications page Model
 * @module Publications
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module Publications
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Publications = new keystone.List('Publications', 
															{
																label: 'Publications Page',
																singular: 'Publications Page',
																track: true,
																nodelete: true,
																nocreate: false
															});

/**
 * Model Fields
 * @main Publications
 */
Publications.add({
	intro: { type: String, label: 'Intro', required: true, initial: true, index: true },
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Publications.defaultSort = '-createdAt';
Publications.defaultColumns = 'blurb, mission';
Publications.register();
