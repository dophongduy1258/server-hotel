const mongoose = require('mongoose');
const {Schema} = mongoose;

 const CategoryHotelSchema = new Schema({

    category:{
        type:String,
    },
    slug:{
        type:String,
    },

})

module.exports = mongoose.model('categoryHotels',CategoryHotelSchema)
