const mongoose = require('mongoose');
const {Schema} = mongoose;

const BenefitHotelSchema = new Schema({

    benefit:{
        type:String,
        // required:true
    },
    hotelID:{
        type:String,
        // required:true
    },

})

module.exports = mongoose.model('benefitHotels',BenefitHotelSchema)


