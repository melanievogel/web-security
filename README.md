# Insecure Mate Web Shop

The goal of this application is to build awareness of cyber security attacks specific to web applications.
Those attacks include:
* SQL Injection
* Session Hijacking
* XSS

## Getting started

Please run this demo webshop only in an isolated sandbox.

### Getting started right away via Docker

Navigate to `/exampleimage` and run:

`docker-compose up`

You can now visit:

`http:\\localhost:4200`

and can try to solve the CTF challenge.

### Development

#### Angular Client

* Known conflicts with webpack and NodeJs Version 17, therefore 16.0.0 works

* Navigate to `exampleimage/angular-client` and run: 

  `npm i`

  `ng serve` 

* Run as Docker Image:
  
  `docker build --tag angular-client`
  `docker run -d --publish 4200:80 angular-client`

#### The Express Server

* Known issues:

  * sqlite 3 only works with node version 14.x; current version is 14.18.1
  * pre-gyp was deprecated, therefore: npm i @mapbox/node-pre-gyp
  * sqlite3 needs python reference:  `npm config set python /usr/bin/python2`

* Navigate to `exampleimage/express-server` and run: 

  `npm i`

  `node server.js`

* Run as Docker Image:
  
  `docker build --tag express-server`
  `docker run -d --publish 3000:3000 express-server`

* Test with:

  `curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000`

