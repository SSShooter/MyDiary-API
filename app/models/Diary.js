var mongoose = require('mongoose');
var diarySchama = mongoose.Schema({
    diaryid: {
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
    create_date: {
        type:String,
        require:true
    }
});

var diaryModel = mongoose.model('diary', diarySchama);
module.exports = diaryModel;
