var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
   text : String,
   pictures : [ (String, String)],
   number : Number,
   date : String
});

module.exports = mongoose.model("Post", postSchema);
