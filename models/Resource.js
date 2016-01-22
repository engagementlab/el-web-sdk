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
	autokey: { from: 'name', path: 'key', unique: true },
  track: true
});

/**
 * Model Fields
 * @main Resource
 */
Resource.add({
	name: { type: String, label: 'Resource Name', required: true, initial: true, index: true },
  type: { type: Types.Select, label: 'Type', options: 'video, article, file', default: 'video', required: true, initial: true },
	
	url: { type: String, label: 'URL',
        dependsOn: { type: ['video', 'article'] }, initial: true },

	file: {
        type: Types.LocalFile,
        dependsOn: { type: 'file' },
        label: 'File',
        dest: 'public/files',
        prefix: 'files/',
        filename: function(item, file) {
            // Sanitize filename
            return item.id + '-' + file.originalname.replace(/\s+/g, '_');
        }
  },

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
	keystone.list('Project').model.removeResourceRef(this._id, function(err, removedCount) {

		if(err)
			console.error(err);
    
		if(removedCount > 0) {
			console.log("Removed " +  removedCount + " references to '"+ this._id + "'");
			next();
		}

	});

});

/**
 * Model Registration
 */
Resource.defaultSort = '-createdAt';
Resource.defaultColumns = 'name';
Resource.register();
