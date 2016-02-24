module.exports = function(grunt, options) {

	var devTasks = [
		'nodemon:serve', 
		'watch',
		'node-inspector'
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
