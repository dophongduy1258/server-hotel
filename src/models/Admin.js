const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdminSchema = new Schema(
  {
    name: {
      type: String,
    },
    imgAdmin: {
      type: String,
    },
    account: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("admins", AdminSchema);
