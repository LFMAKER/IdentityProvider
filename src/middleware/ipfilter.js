const iplist = require("../config/blockIP.json");

module.exports = {
  ipMiddleware(req, res, next) {
    var formattedIP = req.ip.split(":").pop();
    const ipExists = iplist.find((filter) => filter.ip === formattedIP);

    if (ipExists) {
      return res.status(400).json({ error: "Your IP was blocked!" });
    }

    return next();
  },
};
