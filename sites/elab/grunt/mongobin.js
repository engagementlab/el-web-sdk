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
 module.exports = {

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

};
