module.exports = function(grunt, options) {

	var siteModules = [];
	var ignoreFilter = [];
	var watchFilter = [];
	var fs = require('fs');

	var sitesArg = grunt.option('sites');

	// ignoreFilter.push('node_modules/.bin/');

	// Use site modules arg only if defined
	if(sitesArg) {
		
		siteModules = ['--sites=' + sitesArg];
		
		// Site are a comma-sep list
		var arrSites = sitesArg.replace('--sites=', '').split(',');

		// Watch all site modules
		for(var ind in arrSites) {
			ignoreFilter.push('node_modules/' + arrSites[ind] + '/.git/');
			ignoreFilter.push('node_modules/' + arrSites[ind] + '/node_modules/');
			// watchFilter.push('node_modules/' + arrSites[ind] + '/**');
			// watchFilter.push('node_modules/' + arrSites[ind] + '/**/**');
			watchFilter.push(fs.realpathSync('node_modules/' + arrSites[ind] + '/'));
		}

	}

	return {
	
		debug: {
			script: 'server.js',
			options: {
				nodeArgs: ['--inspect'],
				verbose: true,
				env: {
					port: 3000
				}
			}
		},

		serve: {
			script: 'server.js',
			options: {
				args: siteModules,
				nodeArgs: ['--inspect'],
				verbose: true,
				ignore: ignoreFilter,
				watch: watchFilter,
				ext: "js,hbs",
		    callback: function (nodemon) {
	        nodemon.on('log', function (event) {
	          console.log(event.colour);
	        });
	        nodemon.on('restart', function (event) {
	          console.log('node restarted');
	        });
	      },
			}
		}

	}

};
