//Require Dependencies
var mysql = require('mysql');
var dbconnection = process.env.CLEARDB_DATABASE_URL;
 

// Configure Connection
var pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}, 'default');

module.exports = {

    // Post new message to database
    insert: function (data) {
        pool.query('INSERT INTO chatlogs SET ?', data, function (err, res) {
            if (err) {console.log(err)} else {console.log(res.insertId)}
        })
    },

    // Find Messages based on passed parameters/tags
    find: function (columns, input) {
        console.log(columns);
        console.log(input);
        for (var i = 0; i < columns.length; i++) {
            if (columns[i] == "dates") {
                // SELECT * FROM ffcbot.chatlogs WHERE `channel` = 'focused_fire_chat' and `created_at` BETWEEN '2016-09-01' AND '2016-09-10'
                var query = pool.query('SELECT * FROM `chatlogs` WHERE '+ columns[0] +' = ' + input[0] + ' AND `created_at` BETWEEN ' + input[1] + ' AND '+ input[2], function (err, res) {
                    if (err) {console.log(err)};
                    return query.sql;
                });
            }
        }

        if (columns.length == 1) {
            var query = pool.query('SELECT * FROM `chatlogs` WHERE `'+ columns[0] +'` = ?', [input], function (err, res) {
                if (err) {console.log(err)};
                return query.sql;
            }); 
        }

        if (columns.length == 2) {
            var query = pool.query('SELECT * FROM `chatlogs` WHERE '+ columns[0] +' = ' + input[0] + ' AND '+ columns[1] +' = ' + input[1], function (err, res) {
                if (err) {console.log(err)};
                return query.sql;
            });
        }           
        
    }

}
