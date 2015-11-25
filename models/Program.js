/**
 * Engagement Lab Website
 * 
 * Program Model
 * @module program
 * @class program
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
// See: https://github.com/leepowellcouk/mongoose-validator and https://github.com/chriso/validator.js
var validate = require('mongoose-validator');

var Types = keystone.Field.Types;
/**
 * @module program
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Program = new keystone.List('Program');
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
    msg: 'Invalid external link URL'
};

/**
 * Model Fields
 * @main Program
 */
Program.add({
	name: { type: String, label: 'Program Name', required: true, initial: true, index: true },
  description: { type: Types.Markdown, label: 'Description', required: true, initial: true },

	image: { 
		type: Types.LocalFile, label: 'Image',
		dest: './public/images/directory',
		prefix: '/directory',
		allowedTypes: ['image/png'],
		filename: function(item, file) {
			// Sanitize filename
			return 'category_' + safeString(item.name) + '.' + file.extension;
		},
		format: function(item, file) {
			return '<img src="/images/directory/'+file.filename+'" style="max-width: 300px">';
		}
	},
	externalLinkUrl: { type: Types.Url, label: 'External Link URL', validate: urlValidator, required: true, initial: true },

	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Program.defaultSort = '-createdAt';
Program.defaultColumns = 'name';
Program.register();
