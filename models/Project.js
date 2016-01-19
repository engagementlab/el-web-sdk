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
// See: https://github.com/chriso/validator.js
var validator = require('validator');
var Listing = require('./Listing');
var Types = keystone.Field.Types;

/**
 * @module project
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Project = new keystone.List('Project', 
    {
        hidden: false,
        inherits: Listing,
    });

/**
 * Field Validators
 * @main Project
 */
var bylineValidator = {
    validator: function(val) {
        return validator.isLength(val, 1, 250);
    },
    msg: 'Byline cannot exceed 250 characters'
};
var urlValidator = {
    validator: function(val) {
        return !val || validator.isURL(val, {
            protocols: ['http', 'https'],
            require_tld: true,
            require_protocol: false,
            allow_underscores: true
        });
    },
    msg: 'Invalid external link URL'
};
var emailValidator = {
    validator: function(val) {
        return validator.isEmail(val);
    },
    msg: 'Invalid contact email'
};

/**
 * Model Fields
 * @main Project
 */
Project.add({
    
    child_content : {
        /*category: {
            type: Types.Relationship,
            ref: 'ResearchCategory',
            // filters: { isProjectCategory: true, isSubcategory: false },
            required: true,
            initial: true
        },*/
        /*subCategory: { 
            type: Types.Relationship,
            ref: 'Category',
            label: 'Subcategory',
            filters: { isProjectCategory: false, isSubcategory: true },
            initial: true 
        },*/
        subdirectory: {
            type: Types.Relationship,
            ref: 'Subdirectory',
            required: true,
            initial: true
        },
        enabled: { 
            type: Types.Boolean,
            label: 'Enabled'
        },
        featured: { 
            type: Types.Boolean,
            label: 'Featured'
        },
        byline: {
            type: String,
            label: 'Byline Description',
            validate: bylineValidator,
            initial: true,
            required: true
        },
        overview: {
            type: Types.Markdown,
            label: 'Project Narrative',
            initial: true,
            required: true
        },

        startDate: {
            type: Date,
            label: 'Project Start Date',
            initial: true,
            required: true
        },
        endDate: {
            type: Date,
            label: 'Project End Date'
        },
        headerImage: {
            type: Types.CloudinaryImage,
            label: 'Header Image (large)',
            folder: 'site/research/projects',
            autoCleanup: true
        },
        sideImage: {
            type: Types.CloudinaryImage,
            label: 'Side Column Image (small)',
            folder: 'site/research/projects',
            autoCleanup: true
        },
        tabHeadings: {
            type: Types.TextArray,
            label: 'Detail Tab Headings'
        },
        tabText: {
            type: Types.TextArray,
            label: 'Detail Tab Text'
        },

        projectImages: {
            type: Types.CloudinaryImages,
            label: 'Project Images',
            folder: 'site/research/projects',
            autoCleanup: true
        },
        projectImageCaptions: {
            type: Types.TextArray,
            label: 'Project Image Captions'
        },

        // Resource model reference for articles, videos, files
        articles: {
            type: Types.Relationship,
            ref: 'Resource',
            label: 'External Articles',
            filters: {
                type: 'article'
            },
            many: true
        },
        videos: {
            type: Types.Relationship,
            ref: 'Resource',
            label: 'Project Videos',
            filters: {
                type: 'video'
            },
            many: true
        },
        files: {
            type: Types.Relationship,
            ref: 'Resource',
            label: 'Project Files',
            filters: {
                type: 'file'
            },
            many: true
        },

        externalLinkUrl: {
            type: Types.Url,
            label: 'External Link URL',
            validate: urlValidator
        },
        contactName: {
            type: String,
            default: 'Engagement Lab',
            label: 'Contact Name',
            required: true
        },
        contactEmail: {
            type: String,
            default: 'info@elab.emerson.edu',
            label: 'Contact Email',
            validate: emailValidator,
            required: true
        }
    }
});

/**
 * Methods
 * =============
 */

// Remove a given resource from all projects that referenced it (videos and articles as of now)
Project.schema.statics.removeResourceRef = function(resourceId, callback) {

	Project.model.update(
  	{$or: [
			{'videos': resourceId},
			{'articles': resourceId}
		]}, 
	
		{ $pull: { 'videos': resourceId, 'articles': resourceId } },
	
		{ multi: true },
	
		function(err, result) {

			callback(err, result);

			if(err)
				console.error(err)
		}
	);

 }

/**
 * Model Registration
 */
Project.defaultSort = 'sortOrder';
Project.defaultColumns = 'name, category, enabled, featured';
Project.register();