# Insecure Mate Web Shop

This project consists of a 

* insecure web shop application
* task description for students which kind of attacks to perform
* guide for teachers/educational staff to give hints to students while solving the task
* solution depicting the expected approach how to solve the task

The goal of this project is to build awareness of cyber security attacks specific to web applications. Students are getting a task description, every solved task reveals a secret flag to them which is the solution to the task. By solving the task, they should think of the background why those attacks can happen, how they happen and how to prevent them. The task description is available [here](/tasks.pdf).

To guide them, an instructors guide is available to give useful hints to them [here](/guides.pdf).

The expected approach i.e., one possible solution is available [here](/expected.pdf).

Typical web app attacks include:
* SQL Injection
* Session Hijacking
* Cross-Site-Scripting (XSS)

As of now in 2021, they are merged together under category **Injection** on third rank in the [OWASP top 10 web application security risks](https://owasp.org/www-project-top-ten/).

All three scenarios are implemented in one big context, strongly related to the existing most insecure web application the [JuiceShop](https://github.com/bkimminich/juice-shop).

## Getting started

The friendly supplier of Mate and Tschunk - **MateShop** - is the world leader of mate shops. At the moment they think they can do everything with their customers and increase the prices as they want to gain more profit. But not with you! 
Instead of pushing their money into management salaries they should rather invest some money in their cyber security department, because they have real trouble with their vulnerable supplying website. 

In this scenarios you are going to show **MateShop's** management how carelessly their strategy is and perform some serious attacks to their insecure website.

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
  
  `docker build --tag angular-client .`
  
  `docker run -d --publish 4200:80 angular-client`

#### Express Server

* Known issues:

  * sqlite 3 only works with node version 14.x; current version is 14.18.1
  * pre-gyp was deprecated, therefore: npm i @mapbox/node-pre-gyp
  * sqlite3 needs python reference:  `npm config set python /usr/bin/python2`

* Navigate to `exampleimage/express-server` and run: 

  `npm i`

  `node server.js`

* Run as Docker Image:
  
  `docker build --tag express-server .`
  
  `docker run -d --publish 3000:3000 express-server`

* Test with:

  `curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:3000`
  
#### Admin Client

* Navigate to `exampleimage/admin-client` and run: 

  `npm i`
  
* Install GeckoDriver:  

    * wget https://github.com/mozilla/geckodriver/releases/download/v0.30.0/geckodriver-v0.30.0-linux64.tar.gz
    * tar -xvzf geckodriver-v0.30.0-linux64.tar.gz
    * chmod +x geckodriver
    * sudo mv geckodriver /usr/local/bin/

* Run:

  `node admin-client.js`
