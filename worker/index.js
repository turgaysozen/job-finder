var CronJob = require('cron').CronJob;

const scraper = require('../worker/tasks/fetch-github').fetchGithub;
const tryScr = require('../worker/tasks/tryScr');

async function RunCron() {
  scraper();
  tryScr();

}
// cron runs schedule every 6 hours
new CronJob('0 */6 * * *', RunCron, null, true, 'America/Los_Angeles');

