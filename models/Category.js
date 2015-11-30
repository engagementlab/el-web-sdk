/**
 * Engagement Lab Website
 * 
 * Page category Model
 * @module category
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
var Category = new keystone.List('Category', 
																				{	
																					nodelete: true,
																					// nocreate: true,
																					sortable: true,
																					autokey: { path: 'key', from: 'name', unique: true }
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
 * @main Category
 */
Category.add({
	name: { type: String, label: 'Category Name', required: true, initial: true, index: true },
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

	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Methods
 * =============
 */
Category.schema.methods.safeName = function() {
    return safeString(this.name);
}


/**
 * Relationships
 * =============
 */
Category.relationship({ ref: 'Project', refPath: 'projects', path: 'category' });

/**
 * Model Registration
 */
Category.defaultSort  = 'sortOrder';
Category.defaultColumns = 'name';
Category.register();
