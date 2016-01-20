/**
 * Engagement Lab Website
 * 
 * Research category Model
 * @module research_category
 * @class research_category
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module listing
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Directory = new keystone.List('Directory', 
	{	
		hidden: false,
		autokey: { path: 'key', from: 'name', unique: true },
		nocreate: true,
		nodelete: true
	});

/**
 * Model Fields
 * @main Listing
 */
Directory.add({
	name: { type: String, label: 'Directory Name', required: true, initial: true, index: true },
	lead: { type: String, label: 'Description', required: true, initial: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 * =============
 */
Directory.register();
