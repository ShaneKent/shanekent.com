var express    = require("express");
var bodyParser = require("body-parser");
var router     = express.Router();

router.use(bodyParser.json());

router.get("/", function( request, response ) {
   console.log("ShaneKent.com - Request to page " + request.url);
   response.render("pages/index");
});

module.exports = router;
