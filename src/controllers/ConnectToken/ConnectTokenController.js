const jwt = require("jsonwebtoken");

module.exports = {
  async index(request, response) {
    const token = jwt.sign(
      {
        _id: request.body._id,
        name: request.body.name,
        email: request.body.email,
        isAdmin: request.body.isAdmin,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "48h",
      }
    );
    console.log("TOKEN GERADO");

    return response.json({ token });
  },
  async isAuth(request, response) {
    jwt.verify(
      request.body.onlyToken,
      process.env.JWT_SECRET,
      (err, decode) => {
        if (err) {
          return response.json({ auth: false, user: {} });
        }
        console.log("VERIFICADO");
        return response.json({ auth: true, user: decode });
      }
    );
  },
};
