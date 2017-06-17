var mongoose = require('mongoose');
var todolistSchama = mongoose.Schema({
    todolistid: {
        type: String,
        index: true,
        require:true
    },
    //未完成0完成1
    state:  {
        type:String,
        require:true
    },
    content:  {
        type:String,
        require:true
    },
    create_date:  {
        type:String,
        require:true
    },
});

var todolistModel = mongoose.model('todolist', todolistSchama);
module.exports = todolistModel;