var mongoose = require("mongoose");

var passwordSchema = mongoose.Schema({
   password : String
});

module.exports = mongoose.model("Password", passwordSchema);
