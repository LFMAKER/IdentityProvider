const Claim = require("../../models/Claim");
const GenerateLog = require("../../utils/GenerateLog");
const Client = require("../../models/Client");

module.exports = {
  async index(request, response) {
    const claim = await Claim.find().where({Client: request._id});
    await GenerateLog.Info({
      Client: request._id,
      action: "Recover claims",
      Date: new Date(),
    });
    return response.json(claim);
  },
  async show(request, response) {
    const id = request.params.id;
    const claim = await Claim.findOne({Name: id});
    await GenerateLog.Info({
      Client: request._id,
      action: "Recover claims",
      Date: new Date(),
    });
    return response.json(claim);
  },
  async store(request, response) {
    const { Name } = request.body;

    let claim = await Claim.findOne({ Name });

    if (!claim) {
      claim = await Claim.create({
        Name,
        Client: request._id
      });

      let client = await Client.findById(request._id);
      if(!client.Claim.includes(claim._id)){
        client.Claim.push(claim._id);
        client.save();
      }
     

      await GenerateLog.Info({
        Client: request._id,
        action: "Claim created",
        Date: new Date(),
      });
    }
    return response.json({
      message: "Claim has been created successfully!",
      data: claim,
    });
  },
  

};
