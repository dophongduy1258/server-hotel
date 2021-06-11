const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartSchema = new Schema({
  items: [
    {
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
        type: Number,
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
    },
  ],
  total: Number,
  user: String,
});

module.exports = mongoose.model("carts", CartSchema);
p;
