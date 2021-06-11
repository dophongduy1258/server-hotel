const mongoose = require("mongoose");
const { Schema } = mongoose;

const HotelSchema = new Schema({
  nameHotel: {
    type: String,
  },
  imgHotel: {
    type: String,
  },
  rate: {
    type: Number,
  },
  impress: {
    type: String,
  },
  checkIn: {
    type: String,
  },
  checkOut: {
    type: String,
  },
  address: [
    {
      address: String,
    },
  ],
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
  locations: [
    {
      location: String,
    },
  ],
  createAt: String,
  updateAt: String,
});

module.exports = mongoose.model("hotels", HotelSchema);
