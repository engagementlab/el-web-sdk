/**
 * Engagement Lab Website
 * 
 * Resource page Model
 * @module resource
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module resource
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Resource = new keystone.List('Resource', {
	autokey: { from: 'name', path: 'key', unique: true }
});

/**
 * Model Fields
 * @main Resource
 */
Resource.add({
	name: { type: String, label: 'Resource Name', required: true, initial: true, index: true },
  type: { type: Types.Select, label: 'Type', options: 'video, article', default: 'video', required: true, initial: true },
	url: { type: String, label: 'URL', required: true, initial: true },
	data: { type: Types.Embedly, from: 'url', hidden: true },

	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});


/**
 * Relationships
 * =============
 */
Resource.relationship({ ref: 'Project', refPath: 'projects', path: 'resources' });

Resource.schema.pre('remove', function(next) {
    // Remove resource from all that referenced it 
    var removedRef = keystone.list('Project').model.removeResourceRef(this._id);
    
    if(removedRef)
	    next();
});

/**
 * Model Registration
 */
Resource.defaultSort = '-createdAt';
Resource.defaultColumns = 'name';
Resource.register();
