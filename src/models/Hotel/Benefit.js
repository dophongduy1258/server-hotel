const mongoose = require('mongoose');
const {Schema} = mongoose;

 const BenefitSchema = new Schema({

    benefit:{
        type:String,
        // required:true
    },
    quanlityRoomID:{
        type:String,
        // required:true
    },

})

// const Benefit = mongoose.model('benefits',BenefitSchema)
// module.exports = {Benefit};
module.exports = mongoose.model('benefits',BenefitSchema)
