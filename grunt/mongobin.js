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
  var dbPort = '27017';

  if(options.args && options.args[0] !== 'local') 
    dbPort = '4321';

  config.dump = {

    host: '127.0.0.1',
    port: '4321',
    db: database,
    out: './dump/'

  };

  config.restore = {

    host: '127.0.0.1',
    port: dbPort,
    db: database,
    path: './dump/' + database,
    drop: true

  };

  return config;

};
