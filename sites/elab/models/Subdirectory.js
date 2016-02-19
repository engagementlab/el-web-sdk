/**
 * Engagement Lab Website
 * 
 * Research category Modelz
 * @class subdirectory
 * @author Jay Vachon
 * 
 * For field docs: http://keystonejs.com/docs/database/
 *
 * ==========
 */

var keystone = require('keystone');
var Types = keystone.Field.Types;
var Listing = require('./Listing');

/**
 * @module subdirectory
 * @constructor
 * See: http://keystonejs.com/docs/database/#lists-options
 */
var Subdirectory = new keystone.List('Subdirectory', 
    {
        hidden: false,
        inherits: Listing,
        // nocreate: true,
        nodelete: true
    });

/**
 * Model Fields
 * @main Project
 */
Subdirectory.add({
    directory: {
        type: Types.Relationship,
        ref: 'Directory',
        required: true,
        initial: true
    }
});

/**
 * Model Registration
 * =============
 */
// Cache model in redis every .5 hr
Subdirectory.set('redisCache', true);
Subdirectory.set('expires', 60 * 30 * 1000);

Subdirectory.register();

