const sqlite3 = require('sqlite3');
md5 = require('js-md5');

let db = new sqlite3.Database("./mydb.sqlite3", (err) => {
    if (err) {
        console.log('Error when creating the database', err)
    } else {
        console.log('Database created!')
        /* Put code to create table(s) here */
     //   createTableUsers();
     //   createTableBeverages();
    }
})

const createTableBeverages = () => {
    db.run("CREATE TABLE IF NOT EXISTS beverages(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL, age INTEGER)", insertBeverages);
}

const createTableUsers = () => {
    db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, surname TEXT, email TEXT, username TEXT, password TEXT, logintries INTEGER)", deleteAdmin);
}

const deleteAdmin = () => {
    db.run("DELETE FROM users WHERE id=1", insertAdmin)
} 
const insertAdmin = () => {
    db.run("INSERT INTO users(id,firstname,surname,email,username,password,logintries) VALUES (1, 'admin', 'admin', 'admin@mail.com', 'admin', '"+md5('geheim') + "','0')")
} 

const insertBeverages = () => {
    db.run("INSERT INTO beverages(name, price, age) VALUES ('Club Mate', 20.00, 14), ('Tschunk', 30.00, 18);")
}

var loginLockReset = []

const userExists = function (username) {
    console.log("Check Existence of user " + username)
    return new Promise(function (resolve, reject) {
        db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
            if (err) {
                throw err;
            } else {
                (row == undefined) ? reject() : resolve();
            }
        });
    });
}


const checkLoginTries = function (username) {
    console.log("Check login tries for user " + username)
    return new Promise(function (resolve, reject) {

        db.get("SELECT * FROM users WHERE username = ?", [username], (err, row) => {
            if (err) {
                throw err;
            }

            if (row == undefined || row.logintries >= 3) {
                console.log("Exceeded login tries.")
                reject();
            } else {
                resolve();
            }
        });
    });
}

const resetUserLoginTries = function (username) {

    console.log("Reset login tries for user " + username)

    db.run("UPDATE users SET logintries = 0 WHERE username = ?", [username], (err) => {
       
       if(err)  console.log(err);
    });

    let index = loginLockReset.indexOf(username);
    if (index >= 0) {
        loginLockReset.splice(index, 1);
    }

}

const increaseLoginTry = function (username) {

    console.log("Increase login tries for user " + username)

    let loginTryQuery = "UPDATE users SET logintries = logintries + 1 WHERE username = ?";
    db.run(loginTryQuery, [username], (err) => {
       
       if(err) console.log(err);
    });

}

const loginSuccessful = function (username, password) {

    console.log("Check login for user " + username)
    return new Promise(function (resolve, reject) {

        let query = "SELECT * FROM users WHERE username= ? AND password=?";
        db.all(query, [username, password], (err, rows) => {
            if (err) {
                throw err;
            }
            if (rows.length > 0) {
                resolve();
            } else {
                reject();
            }
        });
    });
}

module.exports = {

    getAllBeveragesFromDB: async function(){
        return new Promise(function (resolve, reject) {
     
        db.all("SELECT * FROM beverages",(err, rows) => {
            if(err){
               throw err;
            }else{
                resolve(rows);
            }
        })
    })
    },

    searchBeverage: async function(res, searchterm){
        //let searchterm = req.query.name;
        console.log("db search: " + searchterm)
        if(searchterm.trim() == ''){
            return getAllBeveragesFromDB();
        }
        return new Promise(function(resolve, reject){
            db.all("SELECT * FROM beverages WHERE name LIKE  '%" + searchterm + "%'", (err, rows) => {
                if(err){
                    console.log(err);
                    return res.status(500).send();
                }   
                if (rows.length > 0) {
                    resolve(rows);
                } else {
                    resolve([]);
                }
            })
        })
    },

    searchBeverage2: async function(req, res, searchterm){
        //let searchterm = req.query.name;
        console.log("db search: " + searchterm)

        return new Promise(function(resolve, reject){
            db.get("SELECT * FROM beverages WHERE name =  '" + searchterm + "'", (err, row) => {
                if(err){
                    console.log(err);
                    return res.status(500).send();
                }else{
                    if(row == undefined){
                        reject('no match');
                    }else{
                        console.log("resolve row: " + row.age);
                        resolve(row);
                    }
                }
            })
        }).catch('whooops');
    },

    checkLogin: async function (req, res) {
        let username = req.query.username;
        let password = md5(req.query.password);
        console.log("query username: " + username);
        userExists(username)
            .then(() => {
                checkLoginTries(username)
                    .then(() => {
                        loginSuccessful(username, password)
                            .then(() => {
                                resetUserLoginTries(username);
                                return res.status(200).send();
                            }, () => {
                                increaseLoginTry(username);
                                return res.status(401).send();
                            })
                            .catch(err => console.log(err));;
                    }, () => {
                        if (loginLockReset.indexOf(username) == -1) {
                            loginLockReset.push(username);
                            setTimeout(() => {resetUserLoginTries(username)}, 50000);
                            return res.status(403).send();
                        }
                        return res.status(401).send('blib');
                    })
                    .catch(err => console.log(err));;
            }, () => { res.status(400).send(); })
            .catch(err => console.log(err));
    },

    registerUser: function (req, res) {

        let userProperties = req.query.user;
        userProperties[4] = md5(userProperties[4]);

        let query = "INSERT INTO users (firstname, surname, email, username, password, logintries) VALUES (?,?,?,?,?, 0)";

        db.run(query, userProperties, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send();
            }
            return res.status(201).send();
        });
    }
}
