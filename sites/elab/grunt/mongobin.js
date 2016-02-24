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
