var CronJob = require('cron').CronJob;

const fetchGithub = require('../worker/tasks/fetch-github');

// var CronJob: new (cronTime: string | Date | moment.Moment, onTick: CronCommand, onComplete?: CronCommand, start?: boolean, timeZone?: string, context?: any, runOnInit?: boolean, utcOffset?: string | number, unrefTimeout?: boolean) => CronJob (+1 overload)

new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');