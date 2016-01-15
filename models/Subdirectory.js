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
var Directory = require('./Directory');
var Types = keystone.Field.Types;

/**
 * @module research_category
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Subdirectory = new keystone.List('Subdirectory', 
	{	
		inherits: Directory
	});

/**
 * Model Registration
 * =============
 */
Subdirectory.register();

