const dischord = require('discord.js');
//const fs = require('fs');
var config = require('./ffcbot/config.js');
var utilities = require('./ffcbot/utilities.js');
var bot = new dischord.Client();

require('./main.js');

// Authenticate with the server using a TOKEN
bot.loginWithToken(process.env.BOT_TOKEN || config.BOT_TOKEN, function (token, err) {
    // If Error, display it
    if(err){
        console.log(err);
    }
    // On the event of a message begin sent grab the message object
    bot.once('ready', function () {
        this.on('message', function(message){
            // look at the content of the message
            var input = message.content;
            // check for the cmd at the beginning of the message content
            var logCmd = input.startsWith('!logs');
            // if found, send a message to the author that gave the cmd
            if (logCmd) { 
                bot.sendMessage(message.author, "To download the latest Message Logs, http://ffcbot.herokuapp.com/logs/download");
            }

            //Chat Logging
            if (!message.channel.name) {
                return;
            } else {
                utilities.logMessage(message);
            }        
        });
    });
   
});
