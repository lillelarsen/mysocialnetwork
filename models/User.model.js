const mongoose = require("mongoose");
const User = require("../schemas/User.schema");

module.exports = mongoose.model("User", User);
