/* 
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
==============
 Gruntfile.js
 Grunt task config.
==============
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

	// periodic jobs
	grunt.loadNpmTasks('grunt-periodic');

	// node jobs
	grunt.loadNpmTasks('grunt-execute');

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
		      'public/release/production.js': 
		      [
            'public/js/jquery/*.min.js', // Core
            'public/js/bootstrap/*.min.js',
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
		            'public/fonts/**/*.css',
		            'public/styles/site.css'],
          dest: 'public/release/tmp/concat.css'
      }
    },
		
		cssmin: {
		  target: {
		  	options: { keepSpecialComments: 0 },
		    files: { 'public/release/style.min.css': ['public/release/tmp/concat.css'] }
		  }
		},

		execute: {
			news: {
				src: ['jobs/news.js']
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
	        question: "You are about to deploy the master branch HEAD to the production server. This will also run the 'compile' task and reboot keystone. Are you sure?",
	        input: '_key:y'
	      }
	    }
	  },

	  //TODO: mongorestore -h ds053370.mongolab.com:53370 -d heroku_npvs26cw -u heroku_npvs26cw -p ak1h7ut2fgjsgs7lr6nt3lukkb dump/engagement-lab --drop
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
	        out: './dump/'
	    }
	  },

	  // production daemon
	  forever: {
		  keystone: {
		    options: {
		      index: 'keystone.js',
		      logDir: 'logs'
		    }
		  }
		}

	};

	var configs = require('load-grunt-configs')(grunt, options);
	
	// Project configuration.
	grunt.initConfig(configs);

	// load periodic
	grunt.registerTask('news', [
		'periodic'
	]);

	// load jshint
	grunt.registerTask('lint', [
		'jshint'
	]);

	grunt.registerTask('news', [
		'execute:news'
	]);

	grunt.registerTask('exportdata', ['mongobin:dump']);
	grunt.registerTask('importdata', ['confirm:restore', 'mongobin:restore']);

	grunt.registerTask('alldone', function() {
	  grunt.log.writeln('>>>>>>>> Packages installed, code minified for production! <<<<<<<<');
	});

	// default option to connect server
	grunt.registerTask('default', [
		'periodic:news',
		'jshint',
		'concurrent:dev'
	]);

	// Task to compile script/styles
	grunt.registerTask('compile', [
		'uglify',
		'concat',
		'cssmin',
		'alldone'
	]);

	// Task to deploy to production
	grunt.registerTask('deploy', [
		'confirm:production',
		'pm2deploy:production'
	]);

};
