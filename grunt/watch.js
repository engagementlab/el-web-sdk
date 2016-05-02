module.exports = function(grunt, options) {

	var siteModules = [];
	var watchFilter = [];
	var sitesArg = grunt.option('sites');

	// Use site modules arg only if defined
	if(sitesArg !== undefined) {
		
		siteModules = ['--sites=' + sitesArg];

		// Site are a comma-sep list
		var arrSites = sitesArg.replace('--sites=', '').split(',');

		// Watch all sites' sass files
		for(var ind in arrSites)
			watchFilter.push('node_modules/' + arrSites[ind] + '/public/styles/**/*.scss');

	}

	return {
	
		js: {
			files: [
				'model/**/*.js',
				'routes/**/*.js'
			],
			tasks: ['jshint:all']
		},
		express: {
			files: [
				'server.js',
				'public/js/lib/**/*.{js,json}'
			],
			tasks: ['jshint:server', 'concurrent:dev']
		},
		sass: {
			files: watchFilter,
			tasks: ['sass']
		},
		livereload: {
			files: [
				'public/styles/**/*.css',
			],
			options: {
				livereload: true
			}
		}

	}

};
