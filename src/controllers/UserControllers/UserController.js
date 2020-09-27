const User = require("../../models/User");
const Client = require("../../models/Client");
const GenerateLog = require("../../utils/GenerateLog");

module.exports = {
  async index(request, response) {

    const user = await User.find({Client: request._id });
    await GenerateLog.Info({
      Client: request._id,
      action: "Recover users",
      Date: new Date(),
    });
    return response.json(user);
  },
  async show(request, response) {
    const id = request.params.id;
    const user = await User.findOne({Email: id});
    await GenerateLog.Info({
      Client: request._id,
      action: "Recover user",
      Date: new Date(),
    });
    return response.json(user);
  },
  async store(request, response) {
    const { Name, Password, Email } = request.body;

    let user = await User.findOne({ Email });
    if (!user) {
      user = await User.create({
        Name,
        Password,
        Email,
        Client: request._id
      });

      let client = await Client.findById(request._id);
      if(!client.User.includes(user._id)){
        client.User.push(user._id);
        client.save();
      }
     
      await GenerateLog.Info({
        Client: request._id,
        action: "User created",
        Date: new Date(),
      });
    }
    return response.json({ message: "User has been created successfully!", data: user });
  },
};
