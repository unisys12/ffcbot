// Import dependencies and Utilities
const dischord = require('discord.js');
var config = require('./bot_core/config.js');
var utilities = require('./bot_core/utils.js');

// Instantiate classes
var bot = new dischord.Client();

// Authenticate with Discord Chat server using TOKEN
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

        //Chat Logging - Make sure not to capture DMs. 
        if (!message.channel.name) {
            return;
        } else {
            utilities.logMessage(message);
        }

    });
   
});