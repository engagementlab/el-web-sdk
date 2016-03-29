/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2016
 * ==============
*/

 /**
 * Upload production resources to CDN.
 * 
 * @class Jobs
 * @name jobs/cdn
 */
require('dotenv').load();
var cloudinary = require('cloudinary');

cloudinary.uploader.upload("./public/release/core.js", 
        function(result) { console.log(result); }, 
        { resource_type: "raw", public_id: "site/js/core.js" })