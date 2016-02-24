module.exports = function(grunt, options) {

	var siteModules = [];

	// Use site modules arg only if defined
	if(grunt.option('sites') !== undefined)
		siteModules = ['--sites=' + grunt.option('sites')];

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
				ignore: ['node_modules/**', 'jobs/**', 'grunt/**', 'sites/**/node_modules/**', 'sites/**/grunt/**', 'sites/**/public/plugins/**', 'sites/**/public/styles/*.css']
			}
		}

	}

};
