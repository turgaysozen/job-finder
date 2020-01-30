const express = require('express')
const app = express()
const port = 3001;

var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require('util');
const getAsync = promisify(client.get).bind(client);

app.get('/jobs', async (req, res) => {
    
    // const jobsGithub = await getAsync('github');
    const mergedJobs = await getAsync('MergedAllUniqueJobs');

    // add header 
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    return res.send(mergedJobs);
});

app.get('/jobs/page=:id', async (req, res) => {
    
    // const jobsGithub = await getAsync('github');
    const mergedAllJobs = await getAsync('MergedAllJobs');

    let page = req.params.id;
    const jsonData = JSON.parse(mergedAllJobs);
    let fiftieth =jsonData.slice((page - 1) * 50, page * 50);

    // add header 
    res.set("Content-Type",'application/json');
    res.send(fiftieth);
});

app.get('/jobs/apicall', async (req, res) => {
res.send('<h1>Api Call Page</h1><p>You can call jobs like: <b>http://localhost:3001/jobs/page=1</b></p>');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))