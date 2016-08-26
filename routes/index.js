var express    = require("express");
var bodyParser = require("body-parser");
var router     = express.Router();

var Post = require("../config/models/post");

router.use(bodyParser.json());

router.get("/", function( request, response ) {
   console.log("ShaneKent.com - Request to page shanekent.com" + request.url);

   Post.find({ }, function( error, postList ) {

      if (postList == undefined){
         postList = [];
      }

      response.render("pages/index", { postList : postList});
   });

});

module.exports = router;
