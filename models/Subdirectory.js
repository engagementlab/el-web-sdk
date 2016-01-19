/**
 * Engagement Lab Website
 * 
 * Research category Model
 * @module subdirectory
 * @class subdirectory
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
 * @module subdirectory
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Subdirectory = new keystone.List('Subdirectory', 
    {
        hidden: false,
        inherits: Listing,
    });

/**
 * Model Fields
 * @main Project
 */
Subdirectory.add({
	child_content: {
		directory: {
			type: Types.Relationship,
			ref: 'Directory',
			required: true,
			initial: true
		}
	}
});

/**
 * Model Registration
 * =============
 */
Subdirectory.register();

