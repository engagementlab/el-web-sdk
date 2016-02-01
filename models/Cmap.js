/**
 * Engagement Lab Website
 * 
 * CMAP page Model
 * @module cmap
 * @class cmap
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module cmap
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Cmap = new keystone.List('Cmap', 
	{
		label: 'CMAP Page',
		singular: 'CMAP Page',
		track: true,
		nodelete: true,
		nocreate: true
	});

/**
 * Model Fields
 * @main cmap
 */
Cmap.add({
		name: { type: String, default: "CMAP Page", hidden: true, required: true },
		logo: { type: Types.CloudinaryImage, label: "CMAP logo", folder: "site/cmap", autoCleanup: true },
		programDescription: { type: Types.Textarea, label: "Lead" },
		apply: { type: Types.Markdown, label: "Is CMAP the right program for you?" },
		curriculum: { type: String, label: "Curriculum" },
		structure: { type: Types.Markdown, label: "The Structure" },
		courses: { type: Types.Markdown, label: "Core Courses" },
		createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
	},
	
	'Core Elements of the CMAP Experience', {
		headers: { type: Types.TextArray, label: "Heading", note: "Please add 4" },
		subheaders: { type: Types.TextArray, label: "Subheaders", note: "Please! add 4" },
		elements: { type: Types.TextArray, label: "Element descriptions", note: "Please for the love of all things add 4" }
	});

/**
 * Model Registration
 */
Cmap.register();
