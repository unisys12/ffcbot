var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LogSchema = new Schema({
    
    _id: Number,
    server: String,
    channel: String,
    author: String,
    author_id: Number,
    message: String,
    timestamp: Date

});


module.exports = mongoose.model('Log', LogSchema);
