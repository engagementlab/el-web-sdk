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

 // deprecate

var keystone = require('keystone');
var Listing = require('./Listing');
var Types = keystone.Field.Types;

/**
 * @module research_category
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var ResearchCategory = new keystone.List('ResearchCategory', 
	{	
		hidden: false,
		inherits: Listing
	});

/**
 * Model Registration
 * =============
 */
ResearchCategory.register();

