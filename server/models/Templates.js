const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const templateSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    html: {
      type: String,
    },
    CSS: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: String,
      required: true,
    },
  }
);

const Templates = mongoose.model("templates", templateSchema);

module.exports = Templates;
