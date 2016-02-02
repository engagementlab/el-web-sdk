/**
 * Engagement Lab Website
 * 
 * Tamagagement Model
 * @class subdirectory
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * @module subdirectory
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Tamagagement = new keystone.List('Tamagagement', 
    {
        hidden: true,
        nocreate: true,
        nodelete: true
    });

/**
 * Model Fields
 * @main Project
 */
Tamagagement.add({
    happiness: { type: Types.Number, hidden: true, default: 0.5 }
});

/**
 * Model Registration
 * =============
 */
Tamagagement.register();

