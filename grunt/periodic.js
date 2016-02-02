/* 
 * Engagement Lab Website
 * Developed by Engagement Lab, 2015
==============
 periodic.js
 Periodic grunt tasks.

 @module grunt

 - news is an hourly pull of Medium and Eventbrite feeds
 - mongobackup is a daily backup of the CMS database

 Created by Johnny Richardson on 12/15/15.
==============
*/
module.exports = {

  news: {
    when: 'hourly',
    tasks: ['news']
  },

  mongobackup: {
  	when: 'daily',
  	tasks: ['backupdata']
  }

};
