module.exports = function(grunt, options) {

    const getSymlinks = require('get-symlinks');

    // Get all site dirs (are symlinks)
    const symlinks = getSymlinks.sync(['./node_modules/**']);

    const siteNames = grunt.util._.map(symlinks, function(name) { return name.match(/([^\/]*)\/*$/)[1]; });

    // Obtain sites this job is running for
    var sitesArg = grunt.option('sites');

    // Site are a comma-sep list
    var arrSites = sitesArg.replace('--sites=', '').split(',');

    var deployConfig = grunt.file.readJSON('./node_modules/' + arrSites[0] + '/deploy.json').deploy;
    var keys = Object.keys(deployConfig)

    var hosts = grunt.util._.filter(keys, function(key){ return key.indexOf('sdk') === -1; });
    
    var config = {};

    var hostChoices = [
        {name: 'local', checked: true}
    ];

    // Add site's hosts to choices
    for(var ind in hosts)
        hostChoices.push({name: hosts[ind]});

    var appSelect = {
      options: {
        questions: [
          {
            config: 'deploy.app',
            type: 'list',
            message: 'Which app are you deploying?',
            choices: siteNames
          },
        ],
        then: function(results, done) {

            grunt.config('site_name', results['deploy.app']);

            var deployConfig = grunt.file.readJSON('./node_modules/' + results['deploy.app'] + '/deploy.json').deploy;
            var keys = Object.keys(deployConfig)

            var hosts = grunt.util._.filter(keys, function(key){ return key.indexOf('sdk') === -1; });

            var hostChoices = [];

            // Add site's hosts to choices
            for(var ind in hosts)
                hostChoices.push({name: hosts[ind]});

            grunt.config('site_targets', hostChoices);

            grunt.log.writeln(grunt.config.get('site_targets')[0].name)

            done();
        }
      }
    };

    var appTarget = {
      options: {
        questions: [
          {
            config: 'deploy.target',
            type: 'list',
            message: 'What environment to deploy to?',
            default: 'local',
            choices: grunt.config.get('site_targets'),
            filter: function(value) { return (value==='local') ? 'local' : deployConfig[value].host; }
          },
        ]
      }
    };

    var fromTo = {
      options: {
        questions: [
          {
            config: 'sync.from',
            type: 'list', 
            message: 'Where to sync from?', 
            default: 'local', 
            choices: hostChoices,
            validate: function(value) { return true }, 
            filter: function(value) { return (value==='local') ? 'local' : deployConfig[value].host; }
          },
          {
            config: 'sync.to',
            type: 'list', 
            message: 'Where to sync to?', 
            default: 'local', 
            choices: hostChoices,
            validate: function(value) { return true }, 
            filter: function(value) { return (value==='local') ? 'local' : deployConfig[value].host; }
          }
        ]
      }
    };

    var confirmRestore = {
      options: {
        questions: [
            {
                config: 'sync.restore',
                type: 'confirm',
                message: 'Are you **sure** you want to WIPE and then RESTORE the database where you are syncing to?? ***This cannot be undone.***'
            }
        ],
        then: function(results, done) {

            if(!results['sync.restore'])
                grunt.fail.warn('Stopping restore of database.')

            done();
        }
      }
    };

    config.app_select = appSelect;
    config.app_target = appTarget;
    config.from_to = fromTo;
    config.confirm_restore = confirmRestore;

    return config;

};
