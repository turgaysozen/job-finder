var CronJob = require('cron').CronJob;

const fetchGithub = require('../worker/tasks/fetch-github');
const tryScr = require('../worker/tasks/tryScr');

function RunCron() {
  fetchGithub();
  tryScr();
}

new CronJob('0 */6 * * *', RunCron, null, true, 'America/Los_Angeles');