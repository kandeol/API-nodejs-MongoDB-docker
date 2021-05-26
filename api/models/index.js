const mongoose = require('mongoose');

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.contract = require("./contract.model");
db.option = require("./option.model");

db.ROLES = ["client", "admin"];

module.exports = db;
