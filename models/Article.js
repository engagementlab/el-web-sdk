/**
 * Engagement Lab Website
 * 
 * Article page Model
 * @module article
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module article
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Article = new keystone.List('Article', {
	autokey: { from: 'name', path: 'key', unique: true }
});

/**
 * Model Fields
 * @main Article
 */
Article.add({
	name: { type: String, label: 'Article Name', required: true, initial: true, index: true },
	url: { type: String, label: 'URL', required: true, initial: true },
	data: { type: Types.Embedly, from: 'url', hidden: true },

	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});


/**
 * Relationships
 * =============
 */
Article.relationship({ ref: 'Project', refPath: 'projects', path: 'articles' });

/**
 * Model Registration
 */
Article.defaultSort = '-createdAt';
Article.defaultColumns = 'name';
Article.register();
