module.exports = function(grunt, options) {

	var siteModules = [];
	var ignoreFilter = [];
	var watchFilter = [];

	var sitesArg = grunt.option('sites');

	// Use site modules arg only if defined
	if(sitesArg !== undefined) {
		siteModules = ['--sites=' + sitesArg];
		ignoreFilter = ['/*'];

		// Site are a comma-sep list
		var arrSites = sitesArg.replace('--sites=', '').split(',');

		// Watch all site modules
		for(var ind in arrSites)
			watchFilter.push('node_modules/' + arrSites[ind] + '/**');

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
				ignore: ignoreFilter,
				watch: watchFilter
			}
		}
		// , 'sites/**/node_modules/**'

	}

};
