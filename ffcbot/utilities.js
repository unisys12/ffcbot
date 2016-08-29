//const mongo = require('mongodb').MongoClient;
//const assert = require('assert');
const fs = require('fs');
var db = require('./database.js');

//var ObjectID = require('mongodb').ObjectID;
//var url = 'mongodb://localhost:27017/chat_log';
var chatlog = './storage/app/public/messagelog.log';
//var chatarchive = require('../storage/app/public/chatarchive.json');
var archivepath = './storage/app/public/chatarchive.json';

module.exports = {

    logMessage: function(data) {

        // Put message data into a format suitable for insert statement
        var message = {
            'message_id': data.id,
            'server': data.server.name,
            'channel': data.channel.name,
            'author': data.author.username,
            'author_id': data.author.id,
            'message': data.cleanContent,
            'created_at': new Date()
        }
        
        db.insert(message);
        
    },


    /*logMesseage: function(data) {

        console.log('Fired Save Event!');

        var logMessage = function(db, callback) {
            if (data instanceof Object) {
                
                console.log('Data is an object, trying to insert...')
                db.collection('chatlog').insertOne(
                    {
                        "_id": data.id,
                        "server": data.server.name,
                        "channel": data.channel.name,
                        "author": data.author.username,
                        "author_id": data.author.id,
                        "message": data.cleanContent,
                        "mentions": data.mentions
                    }, function (err, result) {
                    assert.equal(err, null);
                    console.log('Insert performed and closing connection...')
                    callback();
                });
            }
        };

        mongo.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log('Connected to server...');
            logMessage(db, function(err) {
                console.log('Calling logMessage function...')
                db.close()
                console.log('Connection closed...')
            })

        });
        
    },*/
    logChat: function (data) {

        var d = new Date(data.timestamp);
        var date = d.toLocaleDateString();
        var time = d.toLocaleTimeString();

        fs.open(chatlog, 'a', function (err, fd) {
            if (err) {
                console.log(err);
                fs.close(fd);
            } else {
                fs.write(fd, date + ", " + time + ": " + data.author.username + " - " +  data.cleanContent + ";" + '\n', function (err) {
                    if (err) { console.log(err) } else { fs.close(fd) }
                });
            }
        });

    }/*, 
    archiveChat: function (data) {
        var d = new Date(data.timestamp);
        var date = d.toLocaleDateString();
        var time = d.toLocaleTimeString();

        var format = '\t' + "{" + '\n'
                    '\t' + '"_id": ' + data.id + "," + '\n' +
                    '\t' + '"server": ' + data.server.name + "," + '\n' +
                    '\t' + '"room": ' + data.channel.name + "," + '\n' +
                    '\t' + '"timestamp": ' + date + " " + time + "," + '\n' +
                    '\t' + '"user": ' + data.author.username + "," + '\n' +
                    '\t' + '"user_id": ' + data.author.id + "," + '\n' +
                    '\t' + '"message": ' + data.cleanContent + "," + '\n';

        fs.open(archivepath, 'a', function (err, fd) {
            if (err) {
                console.log(err);
                fs.close(fd);
            } else {
                var data = chatarchive.logs.push(format);
                fs.write(fd, data, function (err) {
                    if (err) { console.log(err) } else { fs.close(fd) }
                });
            }
        });
    }*/


}