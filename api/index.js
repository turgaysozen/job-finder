const express = require('express')
const app = express()
const path = require('path');

var redis = require("redis").createClient();

// if (process.env.REDISTOGO_URL) {
//     var rtg = require("url").parse(process.env.REDISTOGO_URL);
//     var redis = require("redis").createClient(rtg.port, rtg.hostname);
//     redis.auth(rtg.auth.split(":")[1]);
// } else {
//     var redis = require("redis").createClient();
// }

const { promisify } = require('util');
const getAsync = promisify(redis.get).bind(redis);


let totalJobsCount;

app.get('/jobs', async (req, res) => {

    const mergedJobs = await getAsync('MergedAllUniqueJobs');
    const mergedAllJobs = await getAsync('MergedAllJobs');
    const jsonData = JSON.parse(mergedJobs);

    // console.log(mergedAllJobs)
    totalJobsCount = (JSON.parse(mergedAllJobs)).length;
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(jsonData);
});

app.get('/jobs/page=:id', async (req, res) => {

    const mergedAllJobs = await getAsync('MergedAllJobs');

    let page = req.params.id;
    const jsonData = JSON.parse(mergedAllJobs);
    let fiftieth = jsonData.slice((page - 1) * 50, page * 50);

    // add header 
    res.set("Content-Type", 'application/json');
    res.send(fiftieth);
});

app.get('/jobs/apicall', async (req, res) => { 
    let onPage = "${onPage}";
    res.send(`
    <h1>Api Call Explanation</h1><p>Total Jobs: ${totalJobsCount}, page count: ${Math.ceil(totalJobsCount / 50)} You can fetch jobs by: <b>http://localhost:3001/jobs/page=1<br/><br/>Example: </b></p>
    <xmp>   let allJobs = [], onPage = 0;
    //fetch all pages from github
    while (onPage <= ${Math.ceil(totalJobsCount / 50)}) {
        try {
            const res = await fetch('http://localhost:3001/jobs/page=${onPage}');
            const jobs = await res.json();
            allJobs.push(...jobs);
            onPage++;
        } catch {
            onPage = 0;
            allJobs = [];
        }
    }
</xmp>
    `);
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

