const Client = require("../../models/Client");

module.exports = {
  async show(request, response) {
    const id = request._id;
    const client = await Client.findById(id).populate("User").populate("Claim");
    return response.json(client);
  },
  async store(request, response) {
    const { ApplicationName, Email, Cnpj, Password } = request.body;
    if (ApplicationName && Email && Cnpj && Password ) {
      const client = await Client.create({
        ApplicationName,
        Email,
        Cnpj,
        Password
      });
      return response.json({
        message: "Client has been created successfully!",
        data: client,
      });
    }

    return response.json({
      message: "ERROR: Invalid fields founded!",
    });
  },
};
