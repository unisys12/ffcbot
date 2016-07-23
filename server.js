/**
  * Instantiate needed packages and dependencies
  *
  **********************************************/

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config.js');
var passport = require('passport');
var exports = module.exports = {};

//console.log(exports);

/**
  * Import external data or Models
  *
  *********************************/
var grimoire = require('./public/assets/grimoire_response.json');
var db = require('./Models/logModel');

/**
 * Connect to MongoDB server
 *
 *************************************/
mongoose.connect(process.env.MONGODB_URI || config.MONGODB_URI, function(err){
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

// Set WebServer Port
var port = 8080;

// Set where static assets will be pulled from
app.use(express.static('public/'));

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, 
      function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      })
  }));

/**
  * App Routes
  *
  ****************************************/
app.get('/logs', function(req, res) {        
    db.find(function(err, msgs) {
        if(err){
            return console.log(err);
        }
        res.json(msgs);
    });
});

app.get('/grimoire', function(req, res) {
    res.json(grimoire);
});

app.listen(port, function() {
    console.log('Webserver Listening on Port: ' + port);
});