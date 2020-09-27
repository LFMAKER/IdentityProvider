var jwt = require("jsonwebtoken");
const User = require("../../../models/User");
const ManageAccess = require("../../../models/ManageAccess");
const Claim = require("../../..//models/Claim");
const GenerateLog = require("../../../utils/GenerateLog");

module.exports = {
  async store(request, response) {
    const { Email, Password } = request.body;
    //Recover user
    let user = await User.findOne({ Email, Password });

    if (user !== null) {
      //Recover user's access
      let manageAcess = await ManageAccess.find({User: user._id})
        .select("-_id")
        .select("-__v");

      let claimsId = manageAcess.map((a) => a.Claim);
    
      //Recover claims of manageAcess
      let claims = await Claim.find()
        .where("_id")
        .in(claimsId)
        .select("-__v").select("-Client");
  
      const expiresIn = 3600;
      var token = await jwt.sign(
        {
          _id: user._id,
          Email: user.Email,
          Name: user.Name,
          Claims: claims,
        },
        process.env.SECRET_CLIENT,
        {
          expiresIn, // expires in 5min
        }
      );

      await GenerateLog.Info({
        userId: request.userId,
        action: "Generate JWT Token",
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
