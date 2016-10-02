const dischord = require('discord.js');

if (!process.env.BOT_TOKEN) {
    require('dotenv').config();
}

var utilities = require('./ffcbot/utilities.js');
var bot = new dischord.Client();

// Authenticate with the server using a TOKEN
bot.loginWithToken("Bot "+process.env.BOT_TOKEN, function (token, err) {
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
            
            if (logCmd) {
                var findByChannelAndDate = input.indexOf("-roomByDate");

                if (findByChannelAndDate > 0) {
                    var result = utilities.queryLogs(input);
                    bot.sendMessage(message.author, "http://ffcbot.herokuapp.com/logs/download/roomBydate/" + result.columns[0] + "/" + result.queries[0] + "/" + result.columns[1] + "/" + result.queries[1] + "/" + result.queries[2]);
                }else{
                    bot.sendMessage(message.author, "To download the latest Message Logs, http://ffcbot.herokuapp.com/logs/download");
                }
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
