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
		label: 'Job Page',
		singular: 'Job Page',
		track: true
		// nodelete: true,
		// nocreate: true
	});

/**
 * Model Fields
 * @main Job
 */
Job.add({
	name: { type: String, default: "Job Page", hidden: true, required: true, initial: true },
	title: { type: Types.Textarea, label: "Title", required: true, initial: true },
	description: { type: Types.Textarea, label: "Description", required: true, initial: true},
	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Job.defaultSort = '-createdAt';
Job.defaultColumns = 'name, updatedAt';
Job.register();
