const mongoose = require('mongoose');
const {Schema} = mongoose;

 const QuanlitySchema = new Schema({

    quanlity:{
        type:String,
        // required:true
    }

})

// const Quanlity = mongoose.model('quanlities',QuanlitySchema)
// module.exports = {Quanlity};


module.exports = mongoose.model('quanlities',QuanlitySchema)