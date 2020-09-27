const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    ApplicationName: String,
    Email: String,
    Cnpj: String,
    Password: String,
    User: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    Claim: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Claim",
        },
    ]
});

module.exports = mongoose.model("Client", ClientSchema);
