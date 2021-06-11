const mongoose = require('mongoose');
const {Schema} = mongoose;

 const AddressHotelSchema = new Schema({

    address:{
        type:String,
    },
    hotelID:{
        type:String,
    }



})

module.exports  = mongoose.model('addressHotel',AddressHotelSchema)


