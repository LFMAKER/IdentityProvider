const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: String,
  Password: String,
  Email: String,
  Client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  }

});

module.exports = mongoose.model("User", UserSchema);
