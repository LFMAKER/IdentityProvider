const mongoose = require("mongoose");

const AuditLogSchema = new mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  Action: String,
  Date: String,
});

module.exports = mongoose.model("AuditLog", AuditLogSchema);
