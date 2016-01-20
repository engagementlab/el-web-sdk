// Deprecated?

var keystone = require('keystone'),
Types = keystone.Field.Types;

/**
 * CaptionImage Model
 * ==================
*/

var CaptionImage = new keystone.List('CaptionImage', {
    map: { name: 'name' },
    autokey: { path: 'slug', from: 'name', unique: true }
});

CaptionImage.add({
  image: { type: Types.CloudinaryImage, folder: 'research/projects', autoCleanup: true, required: true, initial: false },
  caption: { type: Types.Textarea, height: 150 }
});


/**
 * Relationships
 * =============
 */
CaptionImage.relationship({ ref: 'Project', refPath: 'projects', path: 'headerImages' });

CaptionImage.register();