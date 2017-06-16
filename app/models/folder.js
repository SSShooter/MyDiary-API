var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mydiary');
var folderSchama = mongoose.Schema({
    foldername: {
        unique: true,
        type: String
    },
    username: String,
    create_date: String
});

var folderModel = mongoose.model('folder', folderSchama);
module.exports = folderModel;
