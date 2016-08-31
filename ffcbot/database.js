//Require Dependencies
var mysql = require('mysql');
var config = require('../config.js');
var dbconnection = process.env.CLEARDB_DATABASE_URL;
 

// Configure Connection
var pool = mysql.createPool({
    host: process.env.DB_HOST || config.DB_HOST,
    user: process.env.DB_USERNAME || config.DB_USERNAME,
    password: process.env.DB_PASSWORD || config.DB_PASSWORD,
    database: process.env.DB_DATABASE || config.DB_DATABASE
}, 'default');

/*connection.connect(function (err) {
    if (err) {
        console.log('error connecting to database: ' + err.stack);
        return;
    }
    console.log('connected to database as id ' + connection.threadId);
});*/

module.exports = {

    // Make Connection to prepare for queries
    connect: function (){
        
        connection.connect(function (err) {
            if (err) {
                console.log('error connecting to database: ' + err.stack);
                return;
            }

            console.log('connected to database as id ' + connection.threadId);
        });
    },

    // Close Connection
    close: function () {        
        connection.end(function (err){
            if (err) { console.log(err) }
            console.log('connection to database terminated!');
        });
    },

    /**
     *
     * Queries to run
     *
     */

    // Return all chat message entries from database
    getAll: function () {
        connection.query('SELECT * FROM `chatlogs`', function (err, res, fields) {
            if (err) {
                console.log(err)
            } else {
                return res;
            }
        });
    },

    // Post new message to database
    insert: function (data) {
        pool.query('INSERT INTO chatlogs SET ?', data, function (err, res) {
            if (err) {console.log(err)} else {console.log(res.insertId)}
        })
    }

}
