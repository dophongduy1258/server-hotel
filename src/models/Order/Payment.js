const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  paymentMethod: {
    type: String,
  },
  orderDetail: {
    type: String,
  },
  checkout: {
    type: Number,
  },
  codeVoucher:String,
  email: String,
  createAt: String,
});

module.exports = mongoose.model("payments", PaymentSchema);
