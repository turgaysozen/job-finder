
var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const baseUrl = 'https://jobs.github.com/positions.json';

let jrJobs, callback;

 async function fetchGithub() {
    let allJobs = [], onPage = 0;

    //fetch all pages from github
    while (onPage < 3) {
        const res = await fetch(`${baseUrl}?page=${onPage}`);
        const jobs = await res.json();
        allJobs.push(...jobs);
        // console.log(jobs.length + ' added');
        onPage++;
    }
    // console.log('Total Jobs: ' + allJobs.length);

    let addedTime = new Date();
    addedTime.setHours(addedTime.getHours() + 3);

    // filter only english mid level and junior jobs
    jrJobs = allJobs.filter(job => {
        let jobTitle = job.title.toLowerCase();
        let jobDesc = job.description.toLowerCase();
        if (
            false

            // TODO improve filter options

            // jobTitle.includes('senior') || jobTitle.includes('manager') || jobTitle.includes('sr.')
            // || jobTitle.includes('architect') || jobTitle.includes('lead') || jobTitle.includes('director')
            // || jobTitle.includes('coach') || jobTitle.includes('master') || jobTitle.includes('specialist')
            // || jobDesc.includes('4 years') || jobDesc.includes('4+ years') || jobDesc.includes('5 years')
            // || jobDesc.includes('5+ years') || jobDesc.includes('6 years') || jobDesc.includes('6+ years')
            // || jobDesc.includes('7 years') || jobDesc.includes('7+ years') || jobDesc.includes('8 years')
            // || jobDesc.includes('8+ years')

            // // filter by german and dutch
            // || jobDesc.includes('jaar') || jobDesc.includes('ontwikkelingen')
            // || jobDesc.includes('ervaring') || jobDesc.includes('alle') || jobDesc.includes('systemen')
            // || jobDesc.includes(' du ') || jobDesc.includes('automatisierte') || jobDesc.includes(' die ')
            // || jobDesc.includes(' von ') || jobDesc.includes('testgetriebener') || jobDesc.includes(' der ')
        ) {
            return false;
        }

        else {
            job.lastAdded = addedTime;
            return true;
        }
    });

    callback(jrJobs);

    // console.log('Total Junior Jobs: ' + jrJobs.length);

    // const success = await setAsync('github', JSON.stringify(jrJobs));
    // console.log({ success });

}

module.exports = {
    fetchGithub: fetchGithub,
    jrJobs:function(cb){
        if(typeof jrJobs !== 'undefined'){
            cb(jrJobs);
        } else {
            callback = cb;
        }
}
}
// module.exports = fetchGithub.jrJobs;

fetchGithub();
// module.exports = fetchGithub;
