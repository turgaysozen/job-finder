const express = require('express')
const app = express()
const path = require('path');

// var redis = require("redis");
// let client;
var RedisStore = require('connect-redis')(express);

var redis = require("redis").createClient();

if (process.env.REDISTOGO_URL) {
    var rtg = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);
    redis.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

const { promisify } = require('util');
const getAsync = promisify(redis.get).bind(redis);


let totalJobsCount;

app.get('/jobs', async (req, res) => {

    const mergedJobs = await getAsync('MergedAllUniqueJobs');
    const mergedAllJobs = await getAsync('MergedAllJobs');
    // console.log(mergedAllJobs)
    totalJobsCount = (JSON.parse(mergedAllJobs)).length;
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
    res.send(`<h1>Api Call Page</h1><p>Total Jobs: ${totalJobsCount}, page count: ${Math.ceil(totalJobsCount / 50)} You can call jobs like: <b>http://localhost:3001/jobs/page=1</b></p>`);
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
    });
}

app.configure(function(){
    app.set('views', __dirname + '/views');
    console.log('views', __dirname + '/views');
    app.set('view engine', 'jade'); //jade as template engine
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "kqsdjfmlksdhfhzirzeoibrzecrbzuzefcuercazeafxzeokwdfzeijfxcerig",
        store: new RedisStore({ host: 'localhost', port: 6379, client: redis })
    }));
    app.use(app.router);
  });

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

