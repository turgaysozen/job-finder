
const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var cors = require('cors');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'));
    });
}
else {
    require('dotenv').config({ path: '.env' });
}

const Job = require('../model/job');
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let totalJobsCount;

// let jsonData = [
//     {
//         id: 1,
//         type: "null",
//         url: "null",
//         created_at: "Sat Feb 01 12:53:36 UTC 2020",
//         company: "no title",
//         company_url: '',
//         location: "null",
//         title: "no hebele hubele",
//         description: "",
//         how_to_apply: '',
//         company_logo: '',
//         lastAdded: "Sat Feb 01 12:53:36 UTC 2020",
//         categories: "",
//         pubDate: "Sat Feb 01 12:53:36 UTC 2020",
//     }, {
//         id: 2,
//         type: "null",
//         url: "null",
//         created_at: "Sat Feb 01 12:53:36 UTC 2020",
//         company: "no title",
//         company_url: '',
//         location: "null",
//         title: "no title",
//         description: "",
//         how_to_apply: '',
//         company_logo: '',
//         lastAdded: "Sat Feb 01 12:53:36 UTC 2020",
//         categories: "",
//         pubDate: "Sat Feb 01 12:53:36 UTC 2020",
//     }
// ]

app.get('/jobs', async (req, res) => {

    let jsonData = await Job.find();
    // // console.log(jsonData[0].allJobs)
    totalJobsCount = jsonData[0].allJobs.length;
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader('Content-Type', 'application/json');

    // jsonData.toArray((err, result) => {
    //     if(err) throw err;
    //     res.send(result);
    // });
    // res.send(jsonData);
    // console.log(jsonData)
    res.send(jsonData[0].filteredJobs);
});

app.get('/jobs/page=:id', async (req, res) => {
    let jsonData = await Job.find();
    let page = req.params.id;
    let fiftieth = jsonData[0].filteredJobs.slice((page - 1) * 50, page * 50);
    res.set("Content-Type", 'application/json');
    res.send(fiftieth);
});

app.get('/jobs/apicall', async (req, res) => {
    let onPage = "${onPage}";
    res.send(`
    <h1>Api Call Explanation</h1><p>Total Jobs: <b/>${totalJobsCount}</b>, page count: <b>${Math.ceil(totalJobsCount / 50)}</b> You can fetch jobs by: <b>http://localhost:3001/jobs/page=1<br/><br/>Example: </b></p>
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

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`))