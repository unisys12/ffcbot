const discord = require('discord.js');
var bot = new discord.Client();

var mongoose = require('mongoose');
var db = require('./Models/logQueries.js');

var config = require('./config.js');

require('./server.js');

// Authenticate with the server using a TOKEN
bot.loginWithToken(config.BOT_TOKEN, function (token, err) {
    // If Error, display it
    if(err){
        console.log(err);
    }
    // On the event of a message begin sent grab the message object
    bot.on('message', function (message) {
        
        // Process when a chat message is posted        
        // look at the content of the message
        var input = message.content;
        // check for the cmd at the beginning of the message content
        var logCmd = input.startsWith('!logs');
        
        // if found, send a DM to the author that gave the cmd
        if (logCmd) { 
            bot.sendMessage(message.author, "To download the latest Message Logs, http://ffcdiscordbot.app/logs");
        }
        
        //Chat Logging
        if (!message.channel.name) {
            return;
        } else {
            db.logMessage(message);
        }        
        
    });
   
});
