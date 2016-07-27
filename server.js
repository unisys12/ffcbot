/**
  * Instantiate needed packages and dependencies
  *
  **********************************************/

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config.js');
var passport = require('passport').Strategy('passport-local');
var exports = module.exports = {};

//console.log(exports);

/**
  * Import external data or Models
  *
  *********************************/
var grimoire = require('./public/assets/grimoire_response.json');
var Log = require('./Models/logModel');
var User = require('./Models/userModel');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var bodyParser = require("body-parser");

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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, 
      function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      })
  })
);
*/
/**
  * App Routes
  *
  ****************************************/

app.get('/logs', function(req, res) {        
    Log.find(function(err, msgs) {
        if(err){
            return console.log(err);
        }
        res.json(msgs);
    });
});

app.post('/register', function(req, res){
  
  var input = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt)
  };

  var passwordc = bcrypt.hashSync(req.body.confirm_password, salt);

  if (input.password === passwordc) {
    User.create(input, function(err) {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
  }else {
    res.send('register');
  }

    
});

app.post('/login', function(req, res) {
  var input = {
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, salt)
  };

  User.findOne({'email': req.body.email},'name password', function(err, user) {
    if (err) return handleError(err);
    if(!user) {
    console.log('No User with that name was Found!');
  }

  var checkHash = bcrypt.compareSync(user.password, input.password);
  console.log(user.password);
  console.log(input.password);
  if (!checkHash) {
    console.log('Incorrect Password entered for user');
    // Errors on redirect. FInd new method
    res.redirect('/login');
  }
  });

  res.redirect('/');

});

app.get('/grimoire', function(req, res) {
    res.json(grimoire);
});

app.listen(port, function() {
    console.log('Webserver Listening on Port: ' + port);
});