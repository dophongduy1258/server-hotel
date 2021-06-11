const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderDetailSchema = new Schema({
  // roomID: String,
  numberRoom: {
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
  total: Number,
  email: String,
  isCheckout: Boolean,
  createAt: String,
});

module.exports = mongoose.model("orderDetails", OrderDetailSchema);
