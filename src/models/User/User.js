const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  imgUser: {
    type: String,
  },
  phone: {
    type: String,
  },
  CMND: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: Boolean,
  },
  token: {
    type: String,
  },
  createAt: {
    type: String,
  },
  updateAt: String,
  myWallet: {
    type: Number,
  },
  coupon: {
    type: Number,
  },
  vouchers: [
    {
      code:String,
      voucher:String,
      displayName: String,
      status:Boolean,
      createAt:String,
    },
  ],
});

module.exports = mongoose.model("users", UserSchema);
