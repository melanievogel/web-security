#!/usr/bin/env node
var express = require('express');
var sanitizer = require('sanitizer');
var cors = require('cors');
var app = express();

var dbObj = require('./database.js');
app.use(cors());
app.use(express.json());

var flags = [];
var messages = [];
var bugreport = "";
var bevereges = [];

app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

app.route('/searchbeverage').get(function (req, res) {

    let dbPromise;

    if (req.query.q) {
        dbPromise = dbObj.searchBeverage(res, req.query.q)
    } else {
        dbPromise = dbObj.getAllBeveragesFromDB();
    }

    dbPromise.then((rows) => {
        res.send(rows);
    }, (rej) => {
        console.log(rej);
        res.send(400);
    }).catch(err => {
        console.log(err);
        res.send(500);
    })
});

app.route('/shopping').get(function (req, res) {

    dbObj.getAllBeveragesFromDB()
        .then((rows) => {
            res.send(rows);
        }, (rej) => {
            console.log(rej);
            res.send(400);
        }).catch(err => {
            console.log(err);
            res.send(500);
        });


});

app.route('/login').get(function (req, res) {
    dbObj.checkLogin(req, res);
});

app.route('/register').get(function (req, res) {
    dbObj.registerUser(req, res);
})

// 1) Add a route that answers to all request types
app.route('/flags')
    .get(function (req, res) {
        res.send(flags);
    })
    .post(function (req, res) {
        if (req.body && req.body.id && req.body.key == 'SSdtIG5vdCBNciBMZWJvd3NraS4gSSdtIHRoZSBkdWRlLCBtYW4hCg==') {
            if (flags.map(f => f.id).indexOf(req.body.id) < 0) {
                flags.push({ id: req.body.id, value: 'Gnossienne No. 1' })
            }
        }
        res.status(200).send();
    })
    .put(function (req, res) {
        res.status(403).send();
    });
// 1) Add a route that answers to all request types
app.route('/messages')
    .get(function (req, res) {
        res.send(messages);
    })
    .post(function (req, res) {
        if (req.body && req.body.text) {
            /*let filtered = false;
            //Really, really bad XSS filter
            let substrings = ['<img', '<iframe', '<script', '<svg', '()=',, '="','=\'', 'javascript'];
            let length = substrings.length;
            while (length--) {
                if (req.body.text.toLowerCase().indexOf(substrings[length]) != -1) {
                    filtered = true;
                }
            }

            if (filtered) {
                messages.push('Error - does not match filter requirements');
            } else {
                */
            if (messages.length > 5) {
                messages.length = 0;
            }
            messages.push(req.body.text);



            res.status(201).send();
        } else {
            res.status(400).send();
        }
    })

app.route('/bugreport')
    .get(function (req, res) {
        res.send(bugreport);
    })
    .post(function (req, res) {
        if (req.body && req.body.text) {
            bugreport = req.body.text;
        }
        res.status(201).send();
    })

var users = [];

var secretusers = [{ id: 'ZmNrIGFmZAo=', session: '6777616d706572746572205a697066656c6b6c61747363686572' }];

var nomen = ['Aff',
    'Am',
    'Antn',
    'Asphaltschwoibn',
    'Auf',
    'Bagage',
    'Bamhackleter',
    'Bazi',
    'Bettbrunzer',
    'Bixlmadam',
    'Bixn',
    'Bixnmacher',
    'Blunzn',
    'Bochratz',
    'Bockfotzngsicht',
    'Bodschn',
    'Britschn',
    'Brunzkachl',
    'Daddl',
    'Decklkatz',
    'Dolde',
    'Doldi',
    'Dotscherl',
    'Drutschn',
    'Dschamsterer',
    'Fackl',
    'Fettel',
    'Flitscherl',
    'Gifthaferl',
    'Grantler',
    'Gschaftlhuber',
    'Gschdumpate',
    'Gscheidhaferl',
    'Gschwerl',
    'Gspusi',
    'Gwamperte',
    'Gwasch',
    'Gwatschblatschal',
    'Hallodri',
    'Hampera',
    'Haring',
    'Haumtaucher',
    'Hiasl',
    'Himbeerdoni',
    'Hirndappiger',
    'Hirndiwue',
    'Hirntoni',
    'Hirsch',
    'Hua',
    'Hunzgrippe',
    'Kachl',
    'Klampahaferl',
    'Kletznsepp',
    'Kleschn',
    'Klousterbritschn',
    'Kniabiesla',
    'Krattler',
    'Kreiz',
    'Krisperl',
    'Kruzifix',
    'Kuttenbrunzer',
    'Lackl',
    'Laetschenbeni',
    'Loas',
    'Loimsiada',
    'Lucki',
    'Matz',
    'Mistgurgel',
    'Mistpritschen',
    'Mistviech',
    'Muhackl',
    'Narrischer',
    'Oide',
    'Pfenningfuchser',
    'Pfuideifi',
    'Pfundshammel',
    'Platsche',
    'Preiss',
    'Pressack',
    'Pritschen',
    'Ratschkatl',
    'Rindviech',
    'Rotzbua',
    'Ruaschn',
    'Ruamzuzler',
    'Saubande',
    'Saudrack',
    'Saupreiss',
    'Schicksen',
    'Schlawiner',
    'Schlawack',
    'Schlawuzi',
    'Schluchtnscheisser',
    'Schmarrnbeppi',
    'Schnepfen',
    'Schnoin',
    'Sprichfotzn',
    'Schupfabrunzn',
    'Sprichbeitel',
    'Stodterer',
    'Strawanzer',
    'Striezi',
    'Tratschen',
    'Tritschler',
    'Trutschen',
    'Urschl',
    'Verklamperhaferl',
    'Waschweib',
    'Watschengesicht',
    'Wedahex',
    'Weibatz',
    'Weiberer',
    'Weiberleid',
    'Weibsbild',
    'Wogscheidl',
    'Wuaschtkuah',
    'Wurschtler',
    'Zeck',
    'Zipfelklatscher',
    'Zuagroaster',
    'Zwetschgenmanndl',
    'Zwiderwurzen'
];
var adj = ['ausgschamt',
    'brunzbislbled',
    'damische',
    'damischer',
    'deppat',
    'doorate',
    'fad',
    'foischa',
    'gamsig',
    'gescheate',
    'glumpad',
    'goschad',
    'greisslig',
    'grosskopfad',
    'gschamig',
    'gscheat',
    'gschiaglad',
    'gschlampat',
    'gschleckt',
    'gschnappad',
    'gwamperter',
    'hintafotzig',
    'hoaklat',
    'oida',
    'oreidig',
    'ruachat',
    'schiach',
    'zwida']

function getSessionAsHex() {

    let adjIndex = 0;
    let nomenIndex = 0;

    if (Math.random() > 0.5) {
        //first part of adj, last of nomen

        adjIndex = Math.floor(Math.random() * (adj.length / 2));
        nomenIndex = Math.floor(Math.random() * (nomen.length / 2)) + (nomen.length / 2) - 1;
    } else {
        //last part of adj, first of nomen
        adjIndex = Math.floor(Math.random() * (adj.length / 2)) + (adj.length / 2) - 1;
        nomenIndex = Math.floor(Math.random() * (nomen.length / 2));
    }


    let session = adj[adjIndex] + ' ' + nomen[nomenIndex];
    result = '';
    for (var i = 0; i < session.length; i++) {
        result += session.charCodeAt(i).toString(16);
    }
    return result;
}

app.use(express.static('public'));

var trumpfObject = { username: "Donald Trumpf", firstname: "Donald", lastname: "Trumpf", email: "dod@mail.com", password: "geheim", verify: "geheim", pic: "/assets/trump.jpg" };
var hackersProfile = { username: "Your Username", firstname: "Hacker", lastname: "Attacker", email: "att@mail.com", password: "geheim", verify: "geheim", pic: "/assets/dummy.png" };

const path = require("path");

const pic = path.join(__dirname, './public/trump.jpg');


app.route('/profile')
    .get(function (req, res) {

        let id = req.query.id;
        let session = req.query.session;

        if (id && session) {

            secretusers.forEach(suser => {
                if (suser.id == id && suser.session == session) {
                    res.status(200).send({ some: trumpfObject });
                    return;
                }
            });

            users.forEach(user => {
                if (user.id == id && user.session == session) {
                    res.status(200).send({ some: hackersProfile });
                    return;
                }
            });
            res.status(401).send();
        } else {
            res.status(400).send();
        }
    })
app.route('/session')
    .get(function (req, res) {

        let id = req.query.id;
        if (id) {
            let alreadyThere = false;
            secretusers.forEach(u => {
                if (u.id == id) {
                    alreadyThere = true;
                }
            });
            users.forEach(u => {
                if (u.id == id) {
                    alreadyThere = true;
                }
            });

            if (alreadyThere) {
                res.status(418).send();
                return;
            }

            //Generate new bad session cookie
            let sessionCookie = getSessionAsHex();
            console.log('usercount: ' + users.length);
            users.push({ id: id, session: sessionCookie });
            if (users.length > 500) {
                users.splice(0, 1);
            }

            res.status(201).send({ session: sessionCookie });
            return;
        }

        res.status(400).send();
    })


// 2) Use a wildcard for a route
// answers to : theANYman, thebatman, thesuperman
app.get('/the*man', function (req, res) {
    res.send('the*man');
});

// 3) Use regular expressions in routes
// responds to : batmobile, batwing, batcave, batarang
app.get(/bat/, function (req, res) {
    res.send('/bat/');
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry, that route doesn't exist. Have a nice day :)");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});

