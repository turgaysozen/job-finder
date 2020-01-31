const express = require('express')
const app = express()
const port = process.env.PORT || 3001;

var redis = require("redis");
let client;

if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);

    redis.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {

    const mergedJobs = await getAsync('MergedAllUniqueJobs');

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.send(mergedJobs);
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
    res.send('<h1>Api Call Page</h1><p>You can call jobs like: <b>http://localhost:3001/jobs/page=1</b></p>');
});

// const port = process.env.PORT || 5000;
// app.listen(port);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

