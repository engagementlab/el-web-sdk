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

var sitesArr = process.argv.slice(2, process.argv.length);

for(var siteInd in sitesArr) {

	var files = sitesArr[siteInd].split(',');
	var filesArr = files.slice(1, sitesArr[siteInd].length);
	var folderName = files[0];

	for(var fileInd in filesArr) {

		cloudinary.uploader.upload(
			filesArr[fileInd], 
	    
	    function(result) { 
	    	console.log('File "' + filesArr[fileInd] + '" uploaded to ' + result.secure_url);
	    },
	    
	    { 
	    	public_id: folderName + '/' + filesArr[fileInd].substr(filesArr[fileInd].lastIndexOf('/') + 1),
	    	resource_type: "raw" 
		  }
	  );

	}

}