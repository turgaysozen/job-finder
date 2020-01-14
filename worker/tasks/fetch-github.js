
var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
    let allJobs = [], onPage = 0, resultCount = 1;

    while (resultCount > 0) {
        const res = await fetch(`${baseUrl}?page=${onPage}`);
        const jobs = await res.json();
        resultCount = jobs.length;
        allJobs.push(...jobs);
        console.log(jobs.length + ' added');
        onPage++;
    }

    console.log('Total Jobs: ' + allJobs.length);

    const success = await setAsync('github', JSON.stringify(allJobs));

    console.log({success});
}

fetchGithub();
module.exports = fetchGithub;