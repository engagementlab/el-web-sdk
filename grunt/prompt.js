module.exports = function(grunt, options) {

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

    var sync = {
      options: {
        questions: [
          {
            config: 'sync.host', // arbitrary name or config for any other grunt task
            type: 'list', // list, checkbox, confirm, input, password
            message: 'Where to sync from?', // Question to ask the user, function needs to return a string,
            default: 'local', // default value if nothing is entered
            choices: hostChoices,
            validate: function(value) { return true }, // return true if valid, error message if invalid. works only with type:input
            filter: function(value) { return deployConfig[value].host; }
          }
        ]
      }
    };

    config.sync = sync;
    return config;

};
