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
var validator = require('validator');

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
 * Field Validators
 * @main Project
 */
var urlValidator = {
    validator: function(val) {
        return !val || validator.isURL(val, {
            protocols: ['http', 'https'],
            require_tld: true,
            require_protocol: false,
            allow_underscores: true
        });
    },
    msg: 'Invalid link URL (e.g. needs http:// and .org/)'
};

/**
 * Model Fields
 * @main Project
 */
Partner.add({
	url: {
	    type: Types.Url,
	    label: 'Project Website URL',
	    validate: urlValidator,
	    note: 'Must be in format "http://www.something.org"'
	}
});

/**
 * Model Registration
 */
Partner.defaultSort = 'sortOrder';
Partner.defaultColumns = 'name';
Partner.register();
