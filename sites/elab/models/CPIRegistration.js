/**
 * Engagement Lab Website
 * 
 * CommunityPlanIt Registrations
 * @module models
 * @class models
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module listing
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var CPIRegistration = new keystone.List('CPIRegistration', 
	{	
		label: 'CommunityPlanIt Registrations',
		hidden: false,
		autokey: { path: 'key', from: 'email', unique: true },
		nocreate: true
		// nodelete: true,
		// noedit: true
	});

/**
 * Model Fields
 * @main Listing
 */
CPIRegistration.add({
	first_name: { type: String, label: 'First Name', required: true, index: true },
	last_name: { type: String, label: 'Last Name', required: true },
	email: { type: String, label: 'Email', required: true },
	zip: { type: String, label: 'Zip Code', required: true },
});

/**
 * Model Registration
 * =============
 */
CPIRegistration.defaultSort = 'sortOrder';
CPIRegistration.defaultColumns = 'first_name, last_name, email, name';
CPIRegistration.register();
