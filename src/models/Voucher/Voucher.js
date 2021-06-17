const mongoose = require("mongoose");
const { Schema } = mongoose;

const VoucherSchema = new Schema({
  code: String,
  voucher: {
    type: String,
  },
  displayName: String,
  signature: String,
  couponCondition: Number,
  isDisplay: Boolean,
  price:Number,
  amount: Number,
  createAt: String,
  updateAt: String,
});

module.exports = mongoose.model("vouchers", VoucherSchema);
