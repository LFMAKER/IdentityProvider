const mongoose = require("mongoose");

const ManageAccessSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Claim: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Claim",
  },
  Client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  }
});

module.exports = mongoose.model("ManageAccess", ManageAccessSchema);
