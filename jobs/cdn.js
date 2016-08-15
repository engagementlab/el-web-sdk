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
'use strict';

require('dotenv').load();
var cloudinary = require('cloudinary');

var sitesArr = process.argv.slice(2, process.argv.length);

for(var siteInd in sitesArr) {

	let files = sitesArr[siteInd].split(',');
	let filesArr = files.slice(1, sitesArr[siteInd].length);
	let folderName = files[0];

	for(var fileInd in filesArr) {

		cloudinary.uploader.upload(

			filesArr[fileInd], 
	    
	    function(result) { 
	    	console.log('File "' + result.public_id + '" uploaded to ' + result.secure_url);
	    },
	    
	    { 
	    	public_id: folderName + '/' + filesArr[fileInd].substr(filesArr[fileInd].lastIndexOf('/') + 1),
	    	resource_type: "raw",
	    	tags: [folderName],
	    	invalidate: true
		  }
	  
	  );

	}

}