const AuditLog = require("../models/AuditLog");

module.exports = {
  async index(request, response) {
    const { userId } = request.query;

    const log = await AuditLog.find().where("userId").in(userId);
    return response.json(log);
  },
  async store(request, response) {
    const { userId, action, date } = request.body;
    if (userId && action && date) {
      const log = await AuditLog.create({
        userId,
        action,
        date,
      });
      return response.json({
        message: "AuditLog created successfully!",
        data: log,
      });
    }

    return response.json({
      message: "AuditLog error!",
    });
  },
};
