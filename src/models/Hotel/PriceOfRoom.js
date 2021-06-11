const mongoose = require('mongoose');
const {Schema} = mongoose;

 const PriceOfRoomSchema = new Schema({

    priceOfRoom:{
        type:Number,
        // required:true
    },
    quanlityRoomID:{
        type:String,
        // required:true
    },


})

// const PriceOfRoom = mongoose.model('priceOfRooms',PriceOfRoomSchema)
// module.exports = {PriceOfRoom};

module.exports = mongoose.model('priceOfRooms',PriceOfRoomSchema)
