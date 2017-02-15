/*!
 * Engagement Lab Site Framework
 * Developed by Engagement Lab, 2016
 * ==============
*/

 /**
 * Database backup/restore task. Backup should be run nightly as cron task via 'grunt backupdata'. Backup is also copied to another server.
 * 
 * ### Examples:
 *
 *    // Runs backup nightly
 *    0 23 * * * /srv/website/grunt backupdata >/dev/null 2>&1
 *
 *
 * @class Grunt
 * @name grunt/news
 */
 module.exports = function(grunt, options) {

  var config = {};

  // Obtain sites this job is running for
  var sitesArg = grunt.option('sites');

  // Site are a comma-sep list
  var arrSites = sitesArg.replace('--sites=', '').split(',');
  var database =  JSON.parse(require('fs').readFileSync('./node_modules/' + arrSites[0] + '/config.json')).database;

  config.options = {
    host: '127.0.0.1',
    port: '4321'
  };

  config.restore = {
    task: 'restore',
    path: './dump/engagement-lab',
    drop: true
  };

  config.dump = {
    host: '127.0.0.1',
    port: '4321',
    db: database,
    out: './dump/'
  };

  return config;

};
