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
var Category = keystone.list('Category');

/**
 * @module program
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Program = new keystone.List('Program', 
																				{	
																					inherits: Category
																				});
/**
 * Field Validators
 * @main Project
 */
var urlValidator = validate({
								    validator: 'isURL',
								    arguments: { protocols: ['http','https'], require_tld: true, require_protocol: false, allow_underscores: true },
								    message: 'Invalid external link URL'
								  });

/**
 * Model Fields
 * @main Program
 */
Program.add({
	
	externalLinkUrl: { type: Types.Url, label: 'External Link URL', validate: urlValidator, required: true, initial: true }

});

/**
 * Model Registration
 */
Program.defaultSort = '-createdAt';
Program.defaultColumns = 'name';
Program.register();
