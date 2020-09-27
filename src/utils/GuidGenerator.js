const mongoose = require("mongoose");
module.exports = function GuidGenerator() {
  return mongoose.Types.ObjectId();
};
