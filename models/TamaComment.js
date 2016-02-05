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
var TamaComment = new keystone.List('TamaComment', 
    {
        // hidden: true,
        // nocreate: true,
        // nodelete: true
        track: true
    });

/**
 * Model Fields
 * @main Project
 */
TamaComment.add({
    author: { type: String, hidden: true, default: 50 },
    content: { type: String, hidden: true, default: 100 },
    createdAt: { type: Date, default: Date.now, noedit: true, hidden: true }
});

/**
 * Model Registration
 * =============
 */
TamaComment.register();

