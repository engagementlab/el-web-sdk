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
var slack = require('../slack');

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

	// This field is required in the save hook below instead of here as keystone dependsOn workaround
	summary: { type: String, label: 'Summary',
		dependsOn: { type: 'article' } },
	date: { type: Date, label: "Date Published",
		dependsOn: { type: 'article' } },
	author: { type: String, label: 'Author',
		dependsOn: { type: 'article' } },

	file: {
		type: Types.AzureFile,
		dependsOn: { type: 'file' },
		label: 'File',
		filenameFormatter: function(item, filename) {
			return item.key + require('path').extname(filename);
		},
		containerFormatter: function(item, filename) {
			return 'resources';
		}
	},

	imageOverride: {
      type: Types.CloudinaryImage,
      dependsOn: { type : 'article' },
      label: 'Image Override',
      folder: 'site/research',
      note: 'This should be used if the image provided automatically is not acceptable.',
      autoCleanup: true
  },

	data: { type: Types.Embedly, from: 'url', hidden: true },
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Hooks
 * =============
 */
Resource.schema.pre('save', function(next) {
  
  var err;

  /*
		If Azure file upload succeeded but returned no filename, we have to generate manually and save it since
		keystone's createBlockBlobFromLocalFile implementation does not account for Azure returning 
		only "commmittedBlocks" arrays for huge files, and not file metadata.
		I considered submitting a fix PR for azurefile.prototype.uploadFile but I will wait for keystone release ~0.0.4.

		Using filetype as the string to obtain the file extension is not 100% foolproof as it's a MIME type,
		but it works for most common file formats. 
  */
  if(this.file !== undefined && this.file.length > 0 && this.file.filename === undefined) {
	
		this.file.filename = this.key + this.file.filetype.replace('application/', '.');
		this.file.url = this.file.url.replace('undefined', this.file.filename);
  
  }
  
  if (this.type === 'article') {
    
    if (this.date !== undefined && this.date.length === 0)
		err = 'You must provide the date that the article was published. Sorry bub.';

		//  if (this.summary !== undefined && this.summary.length === 0)
		// err = ('You must define a summary for articles.');

		// else if (this.author !== undefined && this.author.length === 0) 
		// 	err = 'You must provide the name of the author who published the article.';
  }

	if(err !== undefined && err.length > 0)
		next(new Error(err));
	else
	{

    // Make a post to slack when this Resource is updated
    slack.post(Resource.model, this, true);

		next();
		
	}

});
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
 * Relationships
 * =============
 */
Resource.relationship({ ref: 'Project', refPath: 'projects', path: 'resources' });

/**
 * Model Registration
 */
Resource.defaultSort = '-createdAt';
Resource.defaultColumns = 'name, type, createdAt';
Resource.register();
