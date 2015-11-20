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
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Project = new keystone.List('Project',
															{
																sortable: true
															});

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
var emailValidator = validate({
								    validator: 'isEmail'
								  });

/**
 * Model Fields
 * @main Project
 */
Project.add({
	name: { type: String, label: 'Project Name', required: true, index: true },
	byline: { type: String, label: 'Byline Description', validate: bylineValidator, initial: true, required: true },
	overview: { type: Types.Markdown, label: 'Project Narrative', initial: true, required: true },
	
	startDate: { type: Date, label: 'Project Start Date', initial: true, required: true },
	endDate: { type: Date, label: 'Project End Date' },

	highlights: { type: Types.TextArray, label: 'Key Features and Highlights' },	
	tabHeadings: { type: Types.TextArray, label: 'Detail Tab Headings' },
	tabText: { type: Types.TextArray, label: 'Detail Tab Text' },

	headerImages: { type: Types.CloudinaryImages, label: 'Header Images (large)', folder: 'research/projects', autoCleanup : true },
	projectImages: { type: Types.CloudinaryImages, label: 'Project Images', folder: 'research/projects', autoCleanup : true },
	projectImageCaptions: { type: Types.TextArray, label: 'Project Image Captions' },
	
	// Resource model reference for articles and videos
	articles: { type: Types.Relationship, ref: 'Resource', label: 'External Articles', filters: { type: 'article' }, many: true },
 	videos: { type: Types.Relationship, ref: 'Resource', label: 'Project Videos', filters: { type: 'video' }, many: true },

	externalLinkUrl: { type: Types.Url, label: 'External Link URL', validate: urlValidator },
	contactName: { type: String, default: 'Engagement Lab', label: 'Contact Name', required: true },
	contactEmail: { type: String, default: 'info@elab.emerson.edu', label: 'Contact Email', validate: emailValidator, required: true },
	
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
