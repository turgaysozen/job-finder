var fetch = require('node-fetch');

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
}

fetchGithub();
module.exports = fetchGithub;