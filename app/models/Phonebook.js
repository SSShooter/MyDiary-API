var mongoose = require('mongoose');
var phonebookSchama = mongoose.Schema({
    phonebookid: {
        type: String,
        index: true,
        require:true
    },
    contact: {
        type:String,
        require:true
    },
    number: {
        type:String,
        require:true
    },
    create_date: {
        type:String,
        require:true
    },
});

var phonebookModel = mongoose.model('phonebook', phonebookSchama);
module.exports = phonebookModel;