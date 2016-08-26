var express    = require("express");
var bodyParser = require("body-parser");
var router     = express.Router();

router.use(bodyParser.json());

router.get("/", function( request, response ) {
   console.log("ShaneKent.com - Request to page shanekent.com/admin" + request.url);
   response.render("pages/admin");
});

router.get("/createNewPicturePost", function( request, response ) {
   console.log("ShaneKent.com - Request to page shanekent.com/admin/createNewPicturePost" + request.url);
   response.render("pages/createNew/createNewPicturePost");
});

router.get("/createNewVideoPost", function( request, response ) {
   console.log("ShaneKent.com - Request to page shanekent.com/admin/createNewVideoPost" + request.url);
   response.render("pages/createNew/createNewVideoPost");
});

router.get("/createNewTextPost", function( request, response ) {
   console.log("ShaneKent.com - Request to page shanekent.com/admin/createNewTextPost" + request.url);
   response.render("pages/createNew/createNewTextPost");
});

module.exports = router;
