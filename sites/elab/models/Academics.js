/**
 * Engagement Lab Website
 * 
 * Academics page Model
 * @module academics
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module academics
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Academics = new keystone.List('Academics', 
	{
		label: 'Academics Page',
		singular: 'Academics Page',
		track: true,
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main Academics
 */
Academics.add({
	intro: { type: Types.Textarea, label: 'Intro Text', required: true, initial: true, index: true },
	logo: { type: Types.CloudinaryImage, label: 'Image', folder: 'site/academics' },	
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Academics.defaultSort = '-createdAt';
Academics.defaultColumns = 'blurb, mission';
Academics.register();
