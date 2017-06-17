var mongoose = require('mongoose');
var folderSchama = mongoose.Schema({
    foldername: {
        unique: true,
        type: String,
        index: true,
        require:true
    },
    username: {
        type: String,
        index: true,
        require:true
    },
    create_date:{
        type:String,
        require:true
    }
});

var folderModel = mongoose.model('folder', folderSchama);
module.exports = folderModel;
