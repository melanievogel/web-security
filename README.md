# Insecure Mate Web Shop

The goal of this application is to build awareness of cyber security attacks specific to web applications.
Those attacks include:
* SQL Injection
* Session Hijacking
* XSS

## Getting started

Please run this demo webshop only in an isolated sandbox.

### The Angular Client

* Navigate to `exampleimage/angular-client` and run: 

  `ng serve`

* Conflicts with webpack and NodeJs Version 17, therefore 16.0.0 works

### The Express Server

Navigate to `exampleimage/express-server` and run: 

`node server.js`

Test with:

`curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000`

* sqlite 3 only works with node version 14.x; current version is 14.18.1
* pre-gyp was deprecated, therefore: npm i @mapbox/node-pre-gyp
* sqlite3 needs python reference:  `npm config set python /usr/bin/python2`
