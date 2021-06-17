const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderDetailSchema = new Schema({
  // roomID: String,
  numberRoom: String,
  status: {
    type: Boolean,
  },
  sizeRoom: String,
  bed: String,
  amountOfPeople: String,
  price: {
    type: Number,
  },
  quality: String,
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
  hotel: String,
  moneyDecreased:Number,
  total: Number,
  email: String,
  isCheckout: Boolean,
  codeVoucher:String,
  statusOrder:Boolean,
  createAt: String,
});

module.exports = mongoose.model("orderDetails", OrderDetailSchema);
