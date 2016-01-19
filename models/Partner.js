/**
 * Engagement Lab Website
 * 
 * Parner Model
 * @module team
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module team
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Partner = new keystone.List('Partner', 
															{
																label: 'Partners',
																singular: 'Partner',
																sortable: true
															});

/**
 * Model Fields
 * @main Partner
 */
Partner.add({

	name: { type: String, label: 'Name', required: true, initial: true },
	description: { type: Types.Markdown, label: 'Description', required: true, initial: true },
	image: { type: Types.CloudinaryImage, label: 'Image', folder: 'site/team', width: 400, height: 400 },
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }

});

/**
 * Model Registration
 */
Partner.defaultSort = 'sortOrder';
Partner.defaultColumns = 'name';
Partner.register();
