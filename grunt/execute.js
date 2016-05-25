// Node script execution
module.exports = function(grunt, options) {

  "use strict";

  var sitesArg = grunt.option('sites');

  var config = {
  	  
  	  news: {
  	    src: ['jobs/news.js']
  	  },
  	
  	  readme: {
  	    src: ['jobs/readme.js']
  	  },
  	
  	  cloudinary: {
  	  	options: {
  	  		args: []
  	  	},
  	    src: ['jobs/cdn.js']
  	  }
  	
  	};

  // Use site modules arg only if defined
  if(sitesArg !== undefined) {

    // Site are a comma-sep list
    var arrSites = sitesArg.replace('--sites=', '').split(',');

    // Tell cloudinary which files to upload preceded by site name
    for(var ind in arrSites) {
     
      config['cloudinary']['options']['args'].push(
    		[
    			arrSites[ind],
	        './node_modules/' + arrSites[ind] + '/public/release/production.js',
	        './node_modules/' + arrSites[ind] + '/public/release/production.css'
        ]
      )
    
    }

  }
/*  else
  {
      config['cloudinary']['options']['args'].push(

      	arrSites[ind],
        '../node_modules/' + arrSites[ind] + '/release/production.js',
        '../node_modules/' + arrSites[ind] + '/release/production.css'

      );
  }
*/
	return config;

};
