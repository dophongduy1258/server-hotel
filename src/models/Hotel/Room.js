const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoomSchema = new Schema({
  // name:{
  //     type:String,
  //     trim:true
  // }
  numberRoom: {
    type: String,
    // required:true
  },
  imgRoom: {
    type: String,
    // required:true
  },
  status: {
    type: Boolean,
    // required:true
  },
  sizeRoom: {
    type: String,
    // required:true
  },
  bed: {
    type: String,
    // required:true
  },
  amountOfPeople: {
    type: String,
    // required:true
  },
  aboutRoom: {
    type: String,
  },
  price: {
    type: Number,
  },
  quality: {
    type: String,
    // required:true
  },
  benefits: [
    {
      benefit: String,
    },
  ],
  conditions: [
    {
      condition: String,
    },
  ],
  hotel: {
    type: String,
  },
  createAt: {
    type: String,
  },
  updateAt: {
    type: String,
  },
});

module.exports = mongoose.model("rooms", RoomSchema);
