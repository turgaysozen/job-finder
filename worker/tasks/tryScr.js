var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

function tryScr() {

    const scrapedObj = [
        {
            id: "8c855a06-063f-4291-98b6-f1d23bb876e61",
            type: "Full Time",
            url: "https://jobs.github.com/positions/8c855a06-063f-4291-98b6-f1d23bb876e6",
            created_at: "Fri Jan 17 14:34:49 UTC 2020",
            company: "moovel Group GmbH (REACH NOW)",
            company_url: "http://www.moovel.com/de/DE",
            location: "Berlin",
            title: "Scraped 1",
            description: "Scraped 1",
            how_to_apply: "Scraped 1",
            company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWQ4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fecbad9db751070039a1bc9c6256fc5ad98933b4/Moovel.png",
            lastAdded: "2020-01-21T00:22:32.885Z",
        },
        {
            id: "8c855a06-063f-4291-98b6-f1d23bb876e62",
            type: "Full Time",
            url: "https://jobs.github.com/positions/8c855a06-063f-4291-98b6-f1d23bb876e6",
            created_at: "Fri Jan 17 14:34:49 UTC 2020",
            company: "moovel Group GmbH (REACH NOW)",
            company_url: "http://www.moovel.com/de/DE",
            location: "Berlin",
            title: "Scraped 2",
            description: "Scraped 2",
            how_to_apply: "Scraped 2",
            company_logo: "https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbWQ4IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fecbad9db751070039a1bc9c6256fc5ad98933b4/Moovel.png",
            lastAdded: "2020-01-21T00:22:32.885Z",
        }
    ]



    // const success = await setAsync('scraped', JSON.stringify(scrapedObj));

    var jrJobsImported = require("./fetch-github.js").jrJobs;
    jrJobsImported(async (jrJobs) => {


        console.log('Imported Jobs Count :' + jrJobs.length)
        console.log('Scraped Jobs Count : ' + scrapedObj.length);

        Array.prototype.push.apply(scrapedObj, jrJobs);

        console.log('Merged Jobs Count: ' + scrapedObj.length);

        
        const success = await setAsync('mergedJobs', JSON.stringify(scrapedObj));
        console.log({success})

    });


    // const success = await setAsync('mergedJobs', JSON.stringify(mergedJobs));
}

tryScr();
module.exports = tryScr;