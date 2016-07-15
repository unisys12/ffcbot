// Require dependencies
const mongo = require('mongodb').MongoClient;
const assert = require('assert');

// Instantiate dependencies
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/chat_log';

module.exports = {

    insertLog: function (data) {
        console.log('Insert method called!');
        var loginsert = {
            "_id": data.id,
            "server": data.server.name,
            "channel": data.channel.name,
            "author": data.author.username,
            "author_id": data.author.id,
            "message": data.cleanContent,
            "mentions": data.mentions
        };

        db.collection('chatlog').insertOne(loginsert, function (err, result) {
            assert.equal(err, null);
            console.log('Insert performed and closing connection...')
            callback();
        });

        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log('Connected to server...');
            insertLog(db, function(err) {
                console.log('Calling insertLog function...')
                db.close()
                console.log('Connection closed...')
            })

        });
    }

}