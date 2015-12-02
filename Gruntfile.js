'use strict()';

var config= {
	port: 3000
};

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	var options = {
		config: {
			src: './grunt/*.js'
		},
		pkg: grunt.file.readJSON('package.json'),
		nodemon: {
			serve: {
				script: 'keystone.js',
				options: {
					ignore: ['node_modules/**']
				}
			}
		},
		uglify: {
		  plugins: {
		    files: {
		      'public/release/plugins.min.js': 
		      [
            'public/plugins/*.js',  // Plugins
            'public/plugins/**/*.js'
			    ]
		    }
		  }
		},
    concat: {
        dist: {
            src: ['public/css/**/*.css', 
			            'public/plugins/**/*.css',
			            'public/fonts/**/*.css'],
            dest: 'public/release/tmp/concat.css'
        }
    },
		cssmin: {
		  target: {
		    files: { 'public/release/style.min.css': ['public/release/tmp/concat.css'] }
		  }
		}
	};

	var configs = require('load-grunt-configs')(grunt, options);
	
	// Project configuration.
	grunt.initConfig(configs);

	// load jshint
	grunt.registerTask('lint', [
		'jshint'
	]);

	grunt.registerTask('dev', [
		'sass',
		'watch'
	]);

	// default option to connect server
	grunt.registerTask('serve', [
		'jshint',
		'concurrent:dev'
	]);

	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});

	grunt.registerTask('default', ['concat', 'uglify']);
	grunt.registerTask('production', ['uglify', 'concat', 'cssmin']);

};
