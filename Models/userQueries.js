var mongoose = require('mongoose');
var User = require('./userModel');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

exports.registerUser = function(data) {

    
    var hash = bcrypt.hashSync(data.password, salt);

    var input = {
        name: data.name,
        email: data.email,
        username: data.username,
        password: hash
    }

    User.create(input, function(err) {
        if(err) {
            return console.log(err);
        }
    });

}