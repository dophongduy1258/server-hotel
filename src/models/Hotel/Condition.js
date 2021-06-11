const mongoose = require('mongoose');
const {Schema} = mongoose;

 const ConditionSchema = new Schema({

    condition:{
        type:String,
        // required:true
    },
    quanlityRoomID:{
        type:String,
        // required:true
    },


})

// const Condition = mongoose.model('conditions',ConditionSchema)
// module.exports = {Condition};
module.exports = mongoose.model('conditions',ConditionSchema)
