var mongoose = require('mongoose');
var diarySchama = mongoose.Schema({
    folderId: {
        type: String,
        index: true,
        require:true
    },
    content: {
        type:String,
        require:true
    },
    pic:[],
    tag: String,
    createDate: {
        type:String,
        require:true
    }
});

var diaryModel = mongoose.model('diary', diarySchama);
module.exports = diaryModel;
