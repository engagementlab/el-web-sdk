// Core framework-wide JS
module.exports = function(grunt, options) {

  "use strict";

  var sitesArg = grunt.option('sites');

  var core = {
    
    files: {
      'public/release/core.js': 
      [
        'public/js/jquery/*.min.js', // jQuery core
        'public/js/bootstrap/*.min.js', // Bootstrap core
        'public/bower_components/**/dist/*.min.js', // Bower
        'public/plugins/*.js',  // Plugins
        'public/plugins/**/*.js',
        'public/js/*.js'
      ]
    },
    options: {
        preserveComments: false,

    }

  },
  sites = {
      
    files: {
      'public/release/sites.js': []
    },
    options: {
        beautify: true,
        preserveComments: false
      }
  
  };

  // Use site modules arg only if defined
  if(sitesArg !== undefined) {

    // Site are a comma-sep list
    var arrSites = sitesArg.replace('--sites=', '').split(',');

    // Compile all site module JS to one file
    for(var ind in arrSites) {
     
      sites['files']['public/release/sites.js'].push(

        'node_modules/' + arrSites[ind] + '/public/bower_components/**/dist/**.min.js', // Bower
        'node_modules/' + arrSites[ind] + '/public/bower_components/**/compiled/**.min.js', // Bower
        'node_modules/' + arrSites[ind] + '/public/bower_components/**/js/**.min.js', // Bower
        'node_modules/' + arrSites[ind] + '/public/plugins/*.js',  // Plugins
        'node_modules/' + arrSites[ind] + '/public/plugins/**/*.js',
        'node_modules/' + arrSites[ind] + '/public/js/*.js'

      );
      grunt.log.writeln("sitesArg", core);
    
    }

  }

  return {'sites': sites, 'core': core};

};
