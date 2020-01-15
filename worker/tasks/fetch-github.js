
var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json';

async function fetchGithub() {
    let allJobs = [], onPage = 1, resultCount = 1;

    //fetch all pages from github
    while (onPage < 3) {
        const res = await fetch(`${baseUrl}?page=${onPage}`);
        const jobs = await res.json();
        resultCount = jobs.length;
        allJobs.push(...jobs);
        console.log(jobs.length + ' added');
        onPage++;
    }
    console.log('Total Jobs: ' + allJobs.length);

    const jrJobs = allJobs.filter(job => {
        let jobTitle = job.title.toLowerCase();
        if (
            jobTitle.includes('senior') || jobTitle.includes('manager') || jobTitle.includes('sr.')
            || jobTitle.includes('architect') || jobTitle.includes('lead') || jobTitle.includes('director')
            || jobTitle.includes('coach') || jobTitle.includes('master') || jobTitle.includes('specialist')
        ) { return false; }
        return true;
    });

    console.log('Total Junior Jobs: ' + jrJobs.length);

    const success = await setAsync('github', JSON.stringify(jrJobs));

    console.log({ success });
}

fetchGithub();
module.exports = fetchGithub;