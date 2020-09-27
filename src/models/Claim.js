const mongoose = require("mongoose");

const ClaimSchema = new mongoose.Schema({
  Name: String,
  Client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  }
});

module.exports = mongoose.model("Claim", ClaimSchema);
