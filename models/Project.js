/**
 * Engagement Lab Website
 * 
 * Project Model
 * @module project
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

/**
 * @module project
 * @constructor
 */
var Project = new keystone.List('Project');

/**
 * Field Validators
 * @main Project
 */
var bylineValidator = validate({
								    validator: 'isLength',
								    arguments: [1, 250],
								    message: 'Byline cannot exceed 250 characters'
								  });
var urlValidator = validate({
								    validator: 'isURL',
								    arguments: { protocols: ['http','https'], require_tld: true, require_protocol: false, allow_underscores: true },
								    message: 'Invalid external link URL'
								  });

/**
 * Model Fields
 * @main Project
 */
Project.add({
	name: { type: String, label: 'Project Name', required: true, index: true },
	byline: { type: String, label: 'Byline Description', validate: bylineValidator, initial: true, required: true },
	overview: { type: Types.Markdown, label: 'Project Narrative', initial: true, required: true },
	highlights: { type: Types.TextArray, label: 'Key Features and Highlights' },

	headerImage: { type: Types.CloudinaryImage, label: 'Header Image (large)', folder: 'research/home', autoCleanup : true },
	projectImages: { type: Types.CloudinaryImages, label: 'Project Images', folder: 'research/projects', autoCleanup : true },
	
	videoUrl: { type: Types.Url, label: 'Project Video URL', validate: urlValidator },
	videoData: { type: Types.Embedly, from: 'videoUrl', options: {width: 750, height: 420}, hidden: true },

	externalLinkUrl: { type: Types.Url, label: 'External Link URL', validate: urlValidator },
	
	projectFiles: { 
		type: Types.LocalFiles, label: 'Project Files',
		dest: 'public/files',
		prefix: 'files/',
		filename: function(item, file) {
			// Sanitize filename
			return item.id + '-' + file.originalname.replace(/\s+/g, '_');
		}
	},
	
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Project.defaultSort = '-createdAt';
Project.defaultColumns = 'name, byline, overview, slugImage';
Project.register();
