/**
 * Engagement Lab Website
 * 
 * Project category Model
 * @module project
 * @class category
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module category
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var ProjectCategory = new keystone.List('ProjectCategory', 
																				{	
																					nodelete: true,
																					nocreate: true
																				});

/**
 * Local Methods
 * =============
 */
safeString = function(str) {
    return str.toLowerCase().replace(/\s+/g, '-').replace(',', '');
}

/**
 * Model Fields
 * @main ProjectCategory
 */
ProjectCategory.add({
	name: { type: String, label: 'Category Name', required: true, initial: true, index: true },
  description: { type: Types.Markdown, label: 'Description', required: true, initial: true },

	image: { 
		type: Types.LocalFile, label: 'Images',
		dest: './public/images/research',
		prefix: '/research',
		allowedTypes: ['image/png'],
		filename: function(item, file) {
			// Sanitize filename
			return 'category_' + safeString(item.name) + '.' + file.extension;
		},
		format: function(item, file) {
			return '<img src="/images/research/'+file.filename+'" style="max-width: 300px">';
		}
	},

	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Methods
 * =============
 */
ProjectCategory.schema.methods.safeName = function() {
    return safeString(this.name);
}


/**
 * Relationships
 * =============
 */
ProjectCategory.relationship({ ref: 'Project', refPath: 'projects', path: 'category' });

/**
 * Model Registration
 */
ProjectCategory.defaultSort = '-createdAt';
ProjectCategory.defaultColumns = 'name';
ProjectCategory.register();
