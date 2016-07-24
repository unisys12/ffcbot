<<<<<<< HEAD
// Import dependencies and Utilities
const dischord = require('discord.js');
var config = require('./bot_core/config.js');
var utilities = require('./bot_core/utils.js');

// Instantiate classes
var bot = new dischord.Client();

// Authenticate with Discord Chat server using TOKEN
=======
const discord = require('discord.js');
var bot = new discord.Client();

var mongoose = require('mongoose');
var db = require('./Models/logQueries.js');

var config = require('./config.js');

require('./server.js');

// Authenticate with the server using a TOKEN
>>>>>>> auth
bot.loginWithToken(config.BOT_TOKEN, function (token, err) {
    // If Error, display it
    if(err){
        console.log(err);
    }
    // On the event of a message begin sent grab the message object
    bot.on('message', function (message) {
<<<<<<< HEAD
        
        // Process when a chat message is posted        
=======
>>>>>>> auth
        // look at the content of the message
        var input = message.content;
        // check for the cmd at the beginning of the message content
        var logCmd = input.startsWith('!logs');
<<<<<<< HEAD
        // if found, send a DM to the author that gave the cmd
=======
        // if found, send a message to the author that gave the cmd
>>>>>>> auth
        if (logCmd) { 
            bot.sendMessage(message.author, "To download the latest Message Logs, http://ffcdiscordbot.app/logs");
        }

<<<<<<< HEAD
        //Chat Logging - Make sure not to capture DMs. 
        if (!message.channel.name) {
            return;
        } else {
            utilities.logMessage(message);
        }

    });
   
});
=======
        //Chat Logging
        if (!message.channel.name) {
            return;
        } else {
            db.logMessage(message);
        }        
        
    });
   
});
>>>>>>> auth
