/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2016
 * ==============
 * Gruntfile.js
 * Grunt task config.
 * ==============
*/
'use strict';

/**
 * Load all of our grunt tasks.
 *
 * ### Examples:
 *
 *    All tasks are loaded from ./grunt/*.js and ./sites/**grunt/*.js
 *
 * @class Grunt
 * @name grunt
 * @return Grunt config
 */
module.exports = function(grunt) {

  var sitesArg = grunt.option('sites');

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	var jobDirs = [
									'./grunt/*.js'
								];

  // Use site modules arg only if defined
  if(sitesArg) {

    // Site are a comma-sep list
    var arrSites = sitesArg.replace('--sites=', '').split(',');

	  // Load any site module grunt configs
	  for(var ind in arrSites) {
			jobDirs.push('./node_modules/' + arrSites[ind] + '/grunt/*.js');
			grunt.log.writeln('Loading grunt configs for ' + arrSites[ind]);
	  }

	}

	var gruntJobsConfig = {
		
		config: { src: jobDirs },
		
		pkg: grunt.file.readJSON('package.json')

	};

	// Copies our nightly backup to the dev server
	/*if(process.env.NODE_ENV == 'production') {
		gruntJobsConfig['sftp'] = 
		{
		  options: {
		      host: 'catan.dev.emerson.edu',
		      username: 'node',
				  privateKey: grunt.file.read("/home/node/.ssh/id_rsa"),
		      showProgress: true,
		      path: '/home/node/backups/engagement-lab/',
		      srcBasePath: "dump/daily_bk/engagement-lab/",
		      createDirectories: true
		  },
		  backup: {
		      files: {
		      	"./": "dump/daily_bk/engagement-lab/**"
		      }
		  }
		};
	}*/

	// Load all of our tasks from ./grunt/*.js and site modules
	var configs = require('load-grunt-configs')(grunt, gruntJobsConfig);
	
	// Project configurations
	grunt.initConfig(configs);

	// Default option to connect server (development)
	grunt.registerTask('default', 'Start the dev server', [
		'jshint',
		'concurrent:dev'
	]);

	// JS linting tasks
	grunt.registerTask('lint', [
		'jshint'
	]);

	grunt.registerTask('news', [
		'execute:news'
	]);

	grunt.registerTask('backupdata', [
		'mongobin:dump',
		'sftp:backup'
	]);
	grunt.registerTask('importdata', [
		'confirm:restore',
		'mongobin:restore'
	]);
	
	// Copies backed up data
	grunt.registerTask('copydata', [
		'sftp:backup'
	]);

	grunt.registerTask('alldone', function() {
	  grunt.log.writeln('>>>>>>>> Packages installed, code minified for production! <<<<<<<<');
	});

	// Experimental: clean/compile all css to minified file
	grunt.registerTask('css_compile', [
		'concat',
		'cssmin'
	]);

	grunt.registerTask('sync', [
		'prompt:from_to',
		'execute:ssh_tunnel_from',
		'mongobin:dump',
		'execute:ssh_tunnel_to',
		'prompt:confirm_restore',
		'mongobin:restore'
	]);

	// Task to compile script/styles
	grunt.registerTask('compile', [
		'uglify',
		'concat',
		'cssmin',
		'execute:cloudinary',
		'alldone'
	]);

	// Task to run tests
	grunt.registerTask('tests', [
		'test:all'
	]);

	/**
	* Task to deploy to production or staging
	* 
	* ### Examples:
	*
	*    // Deploys to production pm2 config
	*    grunt deploy --target=production
	*
	*
	* @class Grunt
	* @name grunt/deploy
	*/
	grunt.registerTask('deploy', function() {
	
		var target = grunt.option('target');
		var skipVersion = grunt.option('skipversion');
		var tasks = [
			'execute:readme',
			'confirm',
			'pm2deploy'
		];

	  if(!target)
	    grunt.fatal('Must specify --target=staging|production');

	  // Set task deployment target
	  tasks = tasks.map(function(task) {
	  	return task + ':' + target;
		});

	  // Version needs to be bumped first after confirming, unlesss skipped or staging deploy
		if(!skipVersion) {
			tasks.push('bump:'+target);
		}
		else {
			grunt.log.writeln("Skipping 'bump' task.");
		}

		if(target === 'staging')
			tasks.push('notify:deploy_staging');
		else
			tasks.push('notify:deploy_prod');

	  grunt.task.run.apply(grunt.task, tasks);

	});

};
