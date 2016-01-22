/**
 * Engagement Lab Website
 * 
 * Publication page Model
 * @module publication
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module publication
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
	author: { type: String, label: 'Author Name(s)', required: true, initial: true },

	category: { type: Types.Select, options: 'Book, Guide, Journal Article', required: true, initial: true },
	// subCategory: { type: Types.Relationship, ref: 'Subdirectory', initial: true },
	
	url: { type: String, label: 'URL',
		dependsOn: { category: 'Journal Article' }, initial: true },

	blurb: { type: Types.Textarea, label: 'Blurb Text', 
		dependsOn: { category: 'Journal' }, required: true, initial: true },

	description: { type: Types.Markdown, label: 'Description Text',
		dependsOn: { category: ['Book', 'Guide'] }, required: false, initial: true },

	image: { type: Types.CloudinaryImage, label: 'Thumbnail',
		dependsOn: { category: ['Book', 'Guide'] }, folder: 'research/publications', autoCleanup: true },
	bannerImage: { type: Types.CloudinaryImage, label: 'Banner Image',
		dependsOn: { categpry: ['Book', 'Guide'] }, folder: 'research/publications', autoCleanup: true },

	date: { type: Date, label: 'Publication Date', initial: true, required: true },

	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Publication.defaultSort = '-createdAt';
Publication.defaultColumns = 'title, category';
Publication.register();
