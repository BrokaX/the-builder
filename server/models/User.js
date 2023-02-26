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
    image: {
      type: String,
    },
    templates:[],
    date: {
      type: String,
      default: new Date().toLocaleString()
    },
    
  },
  { minimize: false }
);

const User = mongoose.model("users", UserSchema);

module.exports = User;