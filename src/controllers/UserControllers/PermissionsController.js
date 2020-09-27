const User = require("../../models/User");
const Claim = require("../../models/Claim");
const ManageAccess = require("../../models/ManageAccess");
module.exports = {
async index(request, response) {

    let user = await User.findById(request._id);

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


    return response.json(claims);
  }
},
async hasPermission(request, response) {
  const id = request.params.id;

  let user = await User.findById(request._id);

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
 
      let hasPerm = claims.map((a) => a.Name).includes(id);

    return response.json({hasPermission: hasPerm});
  }
  return response.json({Message: "User doesn't exist!"});
}
};
