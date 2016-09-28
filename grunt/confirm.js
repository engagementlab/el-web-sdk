module.exports = function(grunt, options) {
  
  var sitesArg = grunt.option('sites');
  
  var
  restore = {
    options: { 
      question: 'Easy, action, easy! You will be overriding the current database with the data in /dump/engagement-lab. Proceed?',
      input: '_key:y'
    }
  },
  production = {
    options: { 
      question: "You are about to tag a new production release and deploy the master branch HEAD for repo '" + sitesArg + "' to the production server.\nThis will also run the 'compile' task and reboot keystone.\n\n\nAre you sure?",
      input: '_key:y'
    }
  },
  staging = {
    options: { 
      question: "You are about to deploy the master branch HEAD for repo '" + sitesArg + "' to the staging server. This will cause a reboot.\n\nAre you sure?",
      input: '_key:y'
    }
  },
  web_staging = {
    options: { 
      question: "You are about to deploy the master branch HEAD for the main 'EL Web' repo to " + sitesArg + "'s staging server. This will cause a reboot.\n\nAre you sure?",
      input: '_key:y'
    }
  },
  web_production = {
    options: { 
      question: "You are about to deploy the master branch HEAD for the main 'EL Web' repo to " + sitesArg + "'s production server. This will cause a reboot.\n\nAre you sure?",
      input: '_key:y'
    }
  };

  return {
    'restore': restore,
    'production': production,
    'staging': staging,
    'web-production': web_production,
    'web-staging': web_staging
  }

};