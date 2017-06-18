var mongoose = require('mongoose');
var folderSchama = mongoose.Schema({
    foldername: {
        type: String,
        index: true,
        require: true
    },
    username: {
        type: String,
        index: true,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    create_date: {
        type: String,
        require: true
    }
});

var folderModel = mongoose.model('folder', folderSchama);
module.exports = folderModel;
