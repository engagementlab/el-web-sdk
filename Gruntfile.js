/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2016
 * ==============
 * Gruntfile.js
 * Grunt task config.
 * ==============
*/
'use strict()';

var config= {
	port: 3000
};

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	var gruntJobsConfig = {
		config: {
			src: ['./grunt/*.js', './sites/**/grunt/*.js']
		},
		
		pkg: grunt.file.readJSON('package.json'),
		
		nodemon: {
			serve: {
				script: 'server.js',
				options: {
					ignore: ['node_modules/**', 'jobs/**', 'grunt/**', 'sites/**/node_modules/**', 'sites/**/grunt/**']
				}
			}
		},

		execute: {
			news: {
				src: ['jobs/news.js']
			},
			readme: {
				src: ['jobs/readme.js']
			}
		},

	  confirm: {
	    restore: {
	      options: { 
	        question: 'Easy, action, easy! You will be overriding the current database with the data in /dump/engagement-lab. Proceed?',
	        input: '_key:y'
	      }
	    },
	    shutdown: {
	      options: { 
	        question: 'You are about to SHUT DOWN the production server. Are you sure?!',
	        input: '_key:y'
	      }
	    },
	    production: {
	      options: { 
	        question: "You are about to deploy the master branch HEAD to the production server.\nThis will also run the 'compile' task and reboot keystone.\n\n\nAre you sure?",
	        input: '_key:y'
	      }
	    },
	    staging: {
	      options: { 
	        question: "You are about to deploy the master branch HEAD to the staging server.\n\nAre you sure?",
	        input: '_key:y'
	      }
	    }
	  },

		mongobin: {

	    options: {
	      host: '127.0.0.1',
	      port: '27017',
	      db: 'engagement-lab'
	    },
	    restore: {
	      task: 'restore',
	      path: './dump/engagement-lab',
	      db: 'engagement-lab-staging',
	      drop: true
	    },
	    dump: {
	        out: './dump/daily_bk/'
	    }

	  },

	  bump: {
	    
	    options: {
	      files: ['package.json'],
	      commit: true,
	      commitMessage: 'Production Release v%VERSION%',
	      commitFiles: ['package.json'],
	      createTag: true,
	      tagName: 'v%VERSION%',
	      tagMessage: 'Version %VERSION%',
	      push: true,
	      pushTo: 'origin'
	    }
	  
	  
	  }
	};

	var configs = require('load-grunt-configs')(grunt, gruntJobsConfig);
	
	// Project configurations
	grunt.initConfig(configs);

	// load jshint
	grunt.registerTask('lint', [
		'jshint'
	]);

	grunt.registerTask('news', [
		'execute:news'
	]);

	grunt.registerTask('backupdata', [
		'mongobin:dump'
	]);
	grunt.registerTask('importdata', [
		'confirm:restore',
		'mongobin:restore'
	]);

	grunt.registerTask('alldone', function() {
	  grunt.log.writeln('>>>>>>>> Packages installed, code minified for production! <<<<<<<<');
	});

	// Default option to connect server (development)
	grunt.registerTask('default', [
		'periodic:news',
		'jshint',
		'concurrent:dev'
	]);

	// Experimental: clean/compile all css to minified file
	grunt.registerTask('css_compile', [
		'concat',
		'cssmin'
	]);

	// Task to compile script/styles
	grunt.registerTask('compile', [
		'uglify',
		'concat',
		'cssmin',
		'alldone'
	]);

	// Task to deploy to production
	grunt.registerTask('deploy', function(target) {

		var tasks = [
			'confirm',
			'pm2deploy'
		];

	  if (target == null)
	    grunt.warn('Must specify staging or production.');

    tasks = tasks.map(function(task) {
    	return task + ':' + target;
  	})

	  // Version needs to be bumped first after confirming
		tasks.splice(1, 0, 'bump');

		console.log(tasks)

	  grunt.task.run.apply(grunt.task, tasks);
	
	});

};
