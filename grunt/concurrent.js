module.exports = function(grunt, options) {

	var sitesArg = grunt.option('sites');

	if(!sitesArg)
    grunt.fatal('Must specify sites to run using: --sites=site-module,site-module-optional');

	var devTasks = [
		'nodemon:serve',
		'watch'
	];

	var config = {

		dev: {
			tasks: devTasks, 	
			options: {
				logConcurrentOutput: true
			}
		}

	};

	return config;
	

};
