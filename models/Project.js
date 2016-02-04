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
var slack = require('../slack');

/**
 * @module project
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Project = new keystone.List('Project', {
    inherits: Listing,
    track: true,
    hidden: false
});

/**
 * Field Validators
 * @main Project
 */
var urlValidator = {
    validator: function(val) {
        return !val || validator.isURL(val, {
            protocols: ['http', 'https'],
            require_tld: true,
            require_protocol: false,
            allow_underscores: true
        });
    },
    msg: 'Invalid link URL (e.g. needs http:// and .org/)'
};

/**
 * Model Fields
 * @main Project
 */
Project.add({

        subdirectory: {
            type: Types.Relationship,
            ref: 'Subdirectory',
            required: true,
            initial: true,
            label: 'Subdirectory'
        },
        enabled: {
            type: Types.Boolean,
            label: 'Enabled'
        },
        featured: {
            type: Types.Boolean,
            label: 'Featured'
        },
        cmapProject: {
            type: Types.Boolean,
            label: "CMAP Project"
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
        }
    },

    'Project Media', {
        projectImages: {
            type: Types.CloudinaryImages,
            label: 'Project Images',
            folder: 'site/research/projects',
            autoCleanup: true
        },
        projectImageCaptions: {
            type: Types.TextArray,
            label: 'Project Image Captions',
            note: 'Each image specified above must have a caption'
        },
        // Resource model reference for videos
        videos: {
            type: Types.Relationship,
            ref: 'Resource',
            label: 'Project Videos',
            filters: {
                type: 'video'
            },
            many: true
        },
        // Resource model reference for files
        files: {
            type: Types.Relationship,
            ref: 'Resource',
            label: 'Project Files',
            filters: {
                type: 'file'
            },
            many: true
        },
        // Resource model reference for articles
        articles: {
            type: Types.Relationship,
            ref: 'Resource',
            label: 'External Articles',
            filters: {
                type: 'article'
            },
            many: true
        },
        // Resource model reference for articles
        blogs: {
            type: Types.Relationship,
            ref: 'Resource',
            label: 'Blog Posts',
            filters: {
                type: 'blog post'
            },
            many: true
        }
    },

    'Custom Project Tabs', {
        customTabs: {
            type: Types.Markdown,
            label: 'Custom Tabs',
            note: 'Each tab heading is designated by an <span class="btn-default btn-sm btn"><span></span>H1</span>, with body text below it'
        },
        tabHeadings: {
            type: Types.TextArray,
            label: 'Custom Tab Heading',
            note: 'Please ensure each tab you add has corresponding text',
            hidden: true
        },
        tabText: {
            type: Types.TextArray,
            label: 'Custom Tab Text',
            hidden: true
        }
    },

    'Other', {
        externalLinkUrl: {
            type: Types.Url,
            label: 'Project Website URL',
            validate: urlValidator,
            note: 'Must be in format "http://www.something.org"'
        },
        githubUrl: {
            type: Types.Url,
            label: 'Github URL',
            validate: urlValidator,
            note: 'Must be in format "http://www.something.org"'
        }

    });

/**
 * Methods
 * =============
 */

// Remove a given resource from all projects that referenced it (videos and articles as of now)
Project.schema.statics.removeResourceRef = function(resourceId, callback) {

    Project.model.update({
            $or: [{
                'videos': resourceId
            }, {
                'articles': resourceId
            }]
        },

        {
            $pull: {
                'videos': resourceId,
                'articles': resourceId
            }
        },

        {
            multi: true
        },

        function(err, result) {

            callback(err, result);

            if (err)
                console.error(err);
        }
    );

};

/**
 * Hooks
 * =============
 */
Project.schema.pre('save', function(next) {

    // Save state for post hook
    this.wasNew = this.isNew;
    this.wasModified = this.isModified();

    if (this.projectImages.length > 0 && (this.projectImages.length < this.projectImageCaptions.length)) {
        var err = new Error('You cannot have more images than their respective captions.');
        next(err);
    }

    next();

});

Project.schema.post('save', function(next) {

    // Make a post to slack when this Project is updated
    slack.post(Project.model, this, true);

});

/**
 * Model Registration
 */
Project.defaultSort = 'sortOrder';
Project.defaultColumns = 'name, subdirectory, enabled, featured';
Project.register();