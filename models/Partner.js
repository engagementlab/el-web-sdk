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
var Listing = require('./Listing');

/**
 * @module team
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Partner = new keystone.List('Partner', 
	{
		sortable: true,
		hidden: false,
    track: true,
		inherits: Listing
	});

/**
 * Model Registration
 */
Partner.defaultSort = 'sortOrder';
Partner.defaultColumns = 'name';
Partner.register();
