const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      default: "online",
    },
    date: {
      type: Date,
      default: Date.now
    },
    
  },
  { minimize: false }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;