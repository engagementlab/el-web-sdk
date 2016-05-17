module.exports = function(grunt, options) {

	var siteModules = [];
	var ignoreFilter = [];
	var watchFilter = [];

	var sitesArg = grunt.option('sites');

	ignoreFilter.push('node_modules/.bin/');

	// Use site modules arg only if defined
	if(sitesArg !== undefined) {
		
		siteModules = ['--sites=' + sitesArg];
		// Site are a comma-sep list
		var arrSites = sitesArg.replace('--sites=', '').split(',');

		// Watch all site modules
		for(var ind in arrSites) {
			ignoreFilter.push('node_modules/' + arrSites[ind] + '/.git/');
			watchFilter.push('node_modules/' + arrSites[ind] + '/**');
			watchFilter.push('node_modules/' + arrSites[ind] + '/**/**');
		}

	}

	return {
	
		debug: {
			script: 'server.js',
			options: {
				nodeArgs: ['--debug'],
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
				nodeArgs: ['--debug'],
				verbose: true,
				ignore: ignoreFilter,
				watch: watchFilter,
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
