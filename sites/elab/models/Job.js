/**
 * Engagement Lab Website
 * 
 * Job page Model
 * @module Job
 * @class Job
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Job model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Job = new keystone.List('Job', 
	{
		label: 'Jobs',
		singular: 'Job',
		track: true,
		autokey: { from: 'title', path: 'key', unique: true }
	});

/**
 * Model Fields
 * @main Job
 */
Job.add({
	title: { type: String, label: "Title", required: true, initial: true },
	description: { type: Types.Markdown, label: "Description", required: true, initial: true},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Job.defaultSort = '-createdAt';
Job.defaultColumns = 'title, updatedAt';
Job.register();
