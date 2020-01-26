var fetch = require('node-fetch');
var redis = require("redis"),
    client = redis.createClient();

const { promisify } = require('util');
const setAsync = promisify(client.set).bind(client);

const Parser = require('rss-parser');

let parser = new Parser();
let allJobs = [];

const FEED_LIST = [
    'https://stackoverflow.com/jobs/feed',
    'https://stackoverflow.com/jobs/feed?location=remote',
];

async function tryScr() {

    const result = FEED_LIST.map(async f => {

        let feed = await parser.parseURL(f);
        feed.items.forEach(item => {
            let newItem = {};
            let location = '';
            if (!item.title.includes('remote')) {
                location = item.title.split(' at ')[1].split('(')[1];
                if (location !== undefined) {
                    location = location.slice(0, -1);
                }
            }
            else {
                location = 'Remote';
            }

            // filter jobs by these keywords: japan, india and not english words
            const title = item.title.toLowerCase();
            const jobDesc = item.contentSnippet.toLowerCase();
            if (
                title.includes('japan') || title.includes('india')
                || jobDesc.includes('jaar') || jobDesc.includes('ontwikkelingen')
                || jobDesc.includes('ervaring') || jobDesc.includes('alle') || jobDesc.includes('systemen')
                || jobDesc.includes(' du ') || jobDesc.includes('automatisierte') || jobDesc.includes(' die ')
                || jobDesc.includes(' von ') || jobDesc.includes('testgetriebener') || jobDesc.includes(' der ')
                || jobDesc.includes('analista') || jobDesc.includes('programador') || jobDesc.includes(' uno ')
                || jobDesc.includes('importante') || jobDesc.includes('experiencia') || jobDesc.includes('programación')
                || jobDesc.includes('técnico') || jobDesc.includes('contratar') || jobDesc.includes('salarial')
                || jobDesc.includes('para') || jobDesc.includes('plataforma') || jobDesc.includes('nuevas')
                || jobDesc.includes('estable') || jobDesc.includes('larga') || jobDesc.includes('cliente')

            ) {
                return false;
            }
            else {

                const cat = item.categories;
                let tags = '';
                const newDesc = item.content;
                const replacedDesc = newDesc.replace(/^(<br\s*\/?>)*|(<br\s*\/?>)*$/i, "");

                if (item.categories !== undefined) {
                    cat.forEach(tag => {
                        tags += tag + ', ';
                    });
                }

                newItem = {
                    id: item.guid,
                    type: location === 'Remote' ? 'Remote' : "Full Time",
                    url: item.link,
                    created_at: item.pubDate,
                    company: item.title.split(' at ')[1].split('(')[0].replace(')', ''),
                    company_url: '',
                    location: location,
                    title: item.title.split(' at ')[0],
                    description: replacedDesc,
                    how_to_apply: '',
                    company_logo: '',
                    lastAdded: item.isoDate,
                    categories: tags.slice(0, -2),
                    pubDate: item.pubDate
                }
                allJobs.push(newItem)
            }
        });
    });

    // const success = await setAsync('scraped', JSON.stringify(scrapedObj));

    var jrJobsImported = require("./fetch-github.js").jrJobs;

    jrJobsImported(async (jrJobs) => {

        // add tag
        jrJobs.map(job => {
            let tags = '';
            const desc = job.description.toLowerCase();
            if (desc.includes('react')) {
                tags += 'react';
            }
            if (desc.includes('node')) {
                tags += ' ,' + 'node';
            }
            if (desc.includes('javascript')) {
                tags += ' ,' + 'javascript';
            }
            if (desc.includes('java')) {
                tags += ' ,' + 'java';
            }
            if (desc.includes('python')) {
                tags += ' ,' + 'python';
            }
            if (desc.includes('postgresql')) {
                tags += ' ,' + 'postgresql';
            }
            if (desc.includes('mysql')) {
                tags += ' ,' + 'mysql';
            }
            if (desc.includes('nosql')) {
                tags += ' ,' + 'nosql';
            }
            if (desc.includes('redis')) {
                tags += ' ,' + 'redis';
            }
            if (desc.includes('mongodb')) {
                tags += ' ,' + 'mongodb';
            }
            if (desc.includes('c#')) {
                tags += ' ,' + 'c#';
            }
            if (desc.includes('c++')) {
                tags += ' ,' + 'c++';
            }
            if (desc.includes('android')) {
                tags += ' ,' + 'android';
            }
            if (desc.includes('ios')) {
                tags += ' ,' + 'ios';
            }
            if (desc.includes('ruby')) {
                tags += ' ,' + 'ruby';
            }
            if (desc.includes('aws')) {
                tags += ' ,' + 'aws';
            }
            if (desc.includes('ui')) {
                tags += ' ,' + 'ui';
            }
            if (desc.includes('ux')) {
                tags += ' ,' + 'ux';
            }
            if (desc.includes('api')) {
                tags += ' ,' + 'api';
            }
            if (desc.includes('php')) {
                tags += ' ,' + 'php';
            }
            if (desc.includes('devops')) {
                tags += ' ,' + 'devops';
            }
            if (desc.includes('machine learning')) {
                tags += ' ,' + 'machine learning';
            }

            // remove comma from the tag
            if(tags.charAt(1) === ','){
                tags = tags.substr(2);
            }

            job.categories = tags;
        });
        console.log('Imported Jobs Count :' + jrJobs.length)
        console.log('Scraped Jobs Count : ' + allJobs.length);

        Array.prototype.push.apply(allJobs, jrJobs);

        console.log('Merged Jobs Count: ' + allJobs.length);

        const success = await setAsync('mergedJobs', JSON.stringify(allJobs));
        console.log({ success })

    });

    // const success = await setAsync('mergedJobs', JSON.stringify(mergedJobs));
}

tryScr();
module.exports = tryScr;