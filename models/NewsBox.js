/**
 * Engagement Lab Website
 * 
 * NewsBox Model
 * @module newsbox
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;
var validator = require('validator');

/**
 * @module resource
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var NewsBox = new keystone.List('NewsBox', {
	track: true,
	sortable: true,
	// nocreate: true,
	nodelete: true
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
 * @main NewsBox
 */
NewsBox.add({
	name: { type: String, label: 'Header', required: true, initial: true, index: true },
	type: { type: Types.Select, label: 'Type', options: 'blog, press, event', default: 'blog', required: true, initial: true },
	text: { type: String, label: 'Text', required: true, initial: true },
	url: {
		type: Types.Url,
		label: 'URL',
		validate: urlValidator,
		note: 'Must be in format "http://www.something.org"',
		required: true,
		initial: true
	},
	urlText: { type: String, label: 'URL Text', required: true, initial: true }
});

/**
 * Model Registration
 */
NewsBox.defaultSort = 'sortOrder';
NewsBox.defaultColumns = 'name, type';
NewsBox.register();