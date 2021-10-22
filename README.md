# Insecure Mate Web Shop

## Getting started

Please run this demo webshop only in an isolated sandbox.

### The Angular Client

Navigate to `exampleimage/angular-client` and run: 

`ng serve`

* Conflicts with webpack and NodeJs Version 17, therefore 16.0.0 works

### The Express Server

Navigate to `exampleimage/express-server` and run: 

`node server.js`

* sqlite 3 only works with node version 14.x; current version is 14.18.1
* pre-gyp was deprecated, therefore: npm i @mapbox/node-pre-gyp
* sqlite3 needs python reference:  `npm config set python /usr/bin/python2`
