const puppeteer = require('puppeteer');
const i = 'scraper'

async function Scraper() {

    // Source
    // https://medium.com/@jaredpotter1/connecting-puppeteer-to-existing-chrome-window-8a10828149e0
    // http://127.0.0.1:9222/json/version


    // const wsChromeEndpointUrl = 'ws://127.0.0.1:9222/devtools/browser/1d19958b-2dc2-4b9d-8236-c707e48bf25f';
    // const browser = await puppeteer.connect({
    //     browserWSEndpoint: wsChromeEndpointUrl,
    //     defaultViewport: null,
    //     args: [
    //         `--disable-extensions-except=${pathToExtension}`,
    //         `--load-extension=${pathToExtension}`
    //       ]
    // });
    console.log(i)

}

// Scraper();
module.exports = Scraper;