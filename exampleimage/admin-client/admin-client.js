#!/usr/bin/env node
const axios = require('axios')
var webdriver = require('selenium-webdriver');
By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;
const firefox = require('selenium-webdriver/firefox');
let options = new firefox.Options()
    .headless();

var endpoint = "http://localhost"
var port = "4200"
var browser = new webdriver.Builder(webdriver.Capabilities.firefox())
    .setFirefoxOptions(options)
    .forBrowser('firefox')
    .build();

async function preload() {

    try {

        await browser.manage().setTimeouts({ 'script': 5000, 'implicit': 1000, 'pageLoad': 5000 });

        await browser.get(endpoint + ":" + port + "/profile");
        await browser.manage().addCookie({ name: 'id', value: 'ZmNrIGFmZAo=' }).catch(err => console.log);
        await browser.manage().addCookie({ name: 'session', value: '6777616d706572746572205a697066656c6b6c61747363686572' }).catch(err => console.log);
        await browser.get(endpoint + ":" + port + "/profile");

        await browser.get(endpoint + ":" + port +"/");
        await browser.manage().addCookie({ name: 'auth', value: 'LFXXKIDDMFXCO5BAON2G64BAOZSWOYLONFZW2CQ=' }).catch(err => console.log);
    } catch (err) { console.log }

}

preload();

setInterval(doStuff, 6000);
async function doStuff() {
    await checkalert();
    await checkBugReports();
}
async function checkalert() {
    await browser.manage().deleteAllCookies().catch(err => console.log);
    console.log('Checking for alerts');
    try {
        console.log("loading Site");
        await browser.get(endpoint  +':' + port + '/messages');
        console.log("loaded Site");

        await browser.sleep(1000);

        let alert = await browser.switchTo().alert();
        let text = await alert.getText();
        await alert.accept();
        console.log("Accepted Alert");
        console.log(text);
        if (text == 'dumb donkey') {
            try {
                await axios.post(endpoint +':3000/flags', {
                    id: '2',
                    key: 'SSdtIG5vdCBNciBMZWJvd3NraS4gSSdtIHRoZSBkdWRlLCBtYW4hCg=='
                })
            } catch (err) {
                console.log(err);
            }
        }

    } catch (error) {
        if (error.name == 'NoSuchAlertError') {
            console.log('No alert found');
        } else {
            console.log(error);
        }
    }
}
async function checkBugReports() {
    console.log('Checking for bug reports');
    try {
        let bugreport = await axios.get(endpoint + ':3000/bugreport');
        await browser.manage().addCookie({ name: 'auth', value: 'LFXXKIDDMFXCO5BAON2G64BAOZSWOYLONFZW2CQ=' }).catch(err => console.log);
        let text = bugreport.data;
        let indexOfHref = text.indexOf("href=\"");
        
        if (indexOfHref >= 0) {
            text = text.substring(indexOfHref);
            let link = text.split('"')[1];
            console.log("Found link" + link);
            await browser.get(link);
         
        }
    } catch (err) {
        console.log(err);
    }
}
