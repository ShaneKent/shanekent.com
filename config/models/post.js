var mongoose = require("mongoose");

var postSchema = mongoose.Schema({
   title : String,
   text : String,
   photos : [ String ],
   videos : [ String ],
   date : String,
   orderDate : Number
});

module.exports = mongoose.model("Post", postSchema);
