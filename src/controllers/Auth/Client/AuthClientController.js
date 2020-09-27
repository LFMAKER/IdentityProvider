var jwt = require("jsonwebtoken");
const Client = require("../../../models/Client");
const GenerateLog = require("../../../utils/GenerateLog");


module.exports = {
  async store(request, response) {
    const { Email, Password } = request.body;
    //Recover user
    let client = await Client.findOne({ Email, Password });

    if (client !== null) {
      //Recover user's access
      const expiresIn = 3600;
      var token = await jwt.sign(
        {
          _id: client._id,
          Email: client.Email,
          Cnpj: client.Cnpj,

        },
        process.env.SECRET_CLIENT,
        {
          expiresIn, // expires in 5min
        }
      );

      await GenerateLog.Info({
        userId: request.userId,
        action: "Generate JWT Token to CLIENT",
        Date: new Date(),
      });

      return response.json({ auth: true, token: token, expiresIn });
    }

    return response.json({ auth: false, message: "Login inválido!" });
  },
  async destroy(request, response) {
    return response.json({ auth: false, token: null });
  },
};
