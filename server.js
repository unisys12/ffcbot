var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

var server = app.listen(process.env.PORT || 80, function () {
    var port = server.address().port;
    console.log("Bot server up and running on port " + port);
});
