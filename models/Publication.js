/**
 * Engagement Lab Website
 * 
 * Publication page Model
 * @module about
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module about
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Publication = new keystone.List('Publication', 
															{
														    sortable: true,
																track: true,
																map: { name: 'title' },
														    autokey: { path: 'key', from: 'name', unique: true }
															});

/**
 * Model Fields
 * @main Publication
 */
Publication.add({
	title: { type: String, label: 'Title', required: true, initial: true, index: true },
	author: { type: Types.Name, label: 'Author Name', required: true, initial: true },
  
  category: { type: Types.Relationship, ref: 'Category', filters: { isSubcategory: true }, required: true, initial: true },
	
	url: { type: String, label: 'URL',
        dependsOn: { category: '565f6849b571da600d4b31c7' }, initial: true },

	blurb: { type: Types.Textarea, label: 'Blurb Text', required: true, initial: true },
	
	description: { type: Types.Markdown, label: 'Description Text',
        dependsOn: { category: '565f45eb88f585d6eeb6f8d8' }, required: true, initial: true },

  image: { type: Types.CloudinaryImage, label: 'Thumbnail', folder: 'research/publications', autoCleanup: true },
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Publication.defaultSort = '-createdAt';
Publication.defaultColumns = 'title, category';
Publication.register();
