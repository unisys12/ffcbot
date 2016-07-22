var mongoose = require('mongoose');
var Log = require('./logModel.js');

exports.logMessage = function(data) {
    
    console.log('Create new Log instance');

    var input = {
        _id: data.id,
        server: data.server.name,
        channel: data.channel.name,
        author: data.author.username,
        author_id: data.author.id,
        message: data.cleanContent,
        mentions: data.mentions,
        timestamp: data.timestamp
    };

    //var Msg = new Log(input);

    Log.create(input, function(err) {
        if (err) {
            return console.log(err);
        };
    });

}