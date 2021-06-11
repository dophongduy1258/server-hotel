const mongoose = require('mongoose');
const {Schema} = mongoose;

 const TodoSchema = new Schema({

    type:{
        type:Boolean,
    },
    slug:{
        type:String,
    },



})

module.exports  = mongoose.model('todos',TodoSchema)


