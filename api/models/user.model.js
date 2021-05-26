const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ],
        contracts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Contract",
                unique: true
            }
        ],
        options: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Option",
                unique: true
            }
        ]
    })
);

module.exports = User;
