const express = require('express')
const app = express()
const path = require('path');

// var redis = require("redis");
// let client;

// var redis = require("redis").createClient();

// if (process.env.REDISTOGO_URL) {
//     var rtg = require("url").parse(process.env.REDISTOGO_URL);
//     var redis = require("redis").createClient(rtg.port, rtg.hostname);
//     redis.auth(rtg.auth.split(":")[1]);
// } else {
//     var redis = require("redis").createClient();
// }

// const { promisify } = require('util');
// const getAsync = promisify(redis.get).bind(redis);

let totalJobsCount = 0;

let mergedAllJobs = [
    {
        id: 1,
        type: "remote",
        url: "no link",
        created_at: "Sat Feb 01 04:29:09 UTC 2020",
        company: "No company",
        company_url: '',
        location: "no location",
        title: "no title",
        description: "no desc",
        how_to_apply: '',
        company_logo: '',
        lastAdded: "Sat Feb 01 04:29:09 UTC 2020",
        categories: "no tags",
        pubDate: "Sat Feb 01 04:29:09 UTC 2020"
    },
    {
        id: 2,
        type: "remote",
        url: "no link",
        created_at: "Sat Feb 01 04:29:09 UTC 2020",
        company: "No company",
        company_url: '',
        location: "no location",
        title: "no title",
        description: "no desc",
        how_to_apply: '',
        company_logo: '',
        lastAdded: "Sat Feb 01 04:29:09 UTC 2020",
        categories: "no tags",
        pubDate: "Sat Feb 01 04:29:09 UTC 2020"
    }
];

app.get('/jobs', async (req, res) => {

    // const mergedJobs = await getAsync('MergedAllUniqueJobs');
    // const mergedAllJobs = await getAsync('MergedAllJobs');
    // console.log(mergedAllJobs)
    // totalJobsCount = (JSON.parse(mergedAllJobs)).length;

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(mergedAllJobs);
});

// app.get('/jobs/page=:id', async (req, res) => {

//     // const mergedAllJobs = await getAsync('MergedAllJobs');

//     let page = req.params.id;
//     const jsonData = JSON.parse(mergedAllJobs);
//     let fiftieth = jsonData.slice((page - 1) * 50, page * 50);

//     // add header 
//     res.set("Content-Type", 'application/json');
//     res.send(fiftieth);
// });

// app.get('/jobs/apicall', async (req, res) => {
//     res.send(`<h1>Api Call Page</h1><p>Total Jobs: ${totalJobsCount}, page count: ${Math.ceil(totalJobsCount / 50)} You can call jobs like: <b>http://localhost:3001/jobs/page=1</b></p>`);
// });

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

