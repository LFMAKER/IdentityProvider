const ManageAccess = require("../../models/ManageAccess");
const Claim = require("../../models/Claim");
const User = require("../../models/User");

const GenerateLog = require("../../utils/GenerateLog");

module.exports = {
  async index(request, response) {

    const manageAccess = await ManageAccess.where({Client: request._id});
    await GenerateLog.Info({
      Client: request._id,
      action: "Recover manage access",
      Date: new Date(),
    });
    return response.json(manageAccess);
  },
  async store(request, response) {
    const { IdUser, IdClaim } = request.body;

    let manageAccess = await ManageAccess.findOne({User: IdUser, Claim: IdClaim});
  
    let user = await User.findById(IdUser);
    let claim = await Claim.findById(IdClaim);

    if(user !== null && claim!== null){
      if(manageAccess === null) {
        manageAccess = await ManageAccess.create({
          User: IdUser,
          Claim : IdClaim,
          Client: request._id
        });

        await GenerateLog.Info({
          Client: request._id,
          action: "Manage Access has been created",
          Date: new Date(),
        });

        return response.json({
          message: "Manage Access has been created successfully!",
          data: manageAccess,
        });
      }else{
        return response.json({
          message: "Manage Access has been successfully recovered!",
          data: manageAccess,
        });
      }
    }

    return response.json({
      message: "The user or claim is invalid!",
      data: {IdUser, IdClaim,  Client: request._id},
    });

    
  },
  
};
