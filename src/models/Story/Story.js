const mongoose = require("mongoose");
const { Schema } = mongoose;

const StorySchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("story", StorySchema);
