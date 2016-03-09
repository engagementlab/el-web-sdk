/**
 * Engagement Lab Website
 * 
 * CPI CPIPartner Model
 * @module models
 * @author Johnny Richardson
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
 * @module models
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var CPIPartner = new keystone.List('CPIPartner', 
	{
		label: 'Community PlanIt Partners',
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
CPIPartner.add({
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
CPIPartner.defaultSort = 'sortOrder';
CPIPartner.defaultColumns = 'name';
CPIPartner.register();
