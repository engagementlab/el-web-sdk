/**
 * Engagement Lab Bot
 * 
 * Device Model
 * @module device
 * @class device
 * @author Johnny Richardson
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * device model
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Device = new keystone.List('Device', 
	{
		singular: 'Device',
		track: true
	});

/**
 * Model Fields
 * @main Device
 */
Device.add({
	deviceNum: { type: Types.Number, label: 'Device #', required: true, initial: true },
	brand: { type: Types.Select, default: 'Apple', 
					 options: 'Apple, Microsoft, Samsung, Motorola, Google, Sony, HTC, ASUS, Oculus, Amazon, Lenovo, *Other',
					 required: true, initial: true },
	customBrand: { type: String, label: '* Which brand?',
								 dependsOn: { category: '*Other' }, initial: true },
	model: { type: String, label: "Model", required: true, initial: true },
	type: { type: Types.Select, label: "Type", 
					 options: 'Phone, Tablet, Music/PDA, VR',
					 required: true, initial: true },
	year: { type: Types.Number, label: "Year" },
	serial: { type: String, label: "Serial/Barcode #" },
	tag: { type: String, label: "Emerson Tag #" },

	createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 */
Device.defaultSort = '-createdAt';
Device.defaultColumns = 'model, brand, type, updatedAt';
Device.register();
