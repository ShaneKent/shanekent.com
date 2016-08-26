var express    = require("express");
var bodyParser = require("body-parser");
var router     = express.Router();

var Password = require("../config/models/password");
var Post = require("../config/models/post");

router.use(bodyParser.json());

router.get("/", function( request, response ) {
   console.log("ShaneKent.com - Request to page shanekent.com/admin" + request.url);
   response.render("pages/admin");
});

router.get("/createNewPost", function( request, response ) {
   console.log("Admin - Request to page shanekent.com/admin" + request.url);
   response.render("pages/createNew/createNewPost");
});

router.get("/emergencySafetyCheck", function( request, response ) {
   console.log("Admin - Request to page shanekent.com/admin" + request.url);
   response.render("pages/createNew/createNewEmergencySafetyCheck");
});

router.post("/emergencySafetyCheck", function( request, response ) {
   console.log("\tAdmin Posting - Post made to shanekent.com/admin" + request.url);

   var passedPassword = request.body.password;
   console.log("\tThe password that was passed: " + passedPassword);

   Password.findOne({ }, function( error, passObj ){

      if (passObj != undefined){
         if (passObj.password == passedPassword){
            console.log("\t\tPOSTING AN EMERGENCY SAFETY CHECK. THIS IS NOT A DRILL.");

            var emerPost = Post({
               text : "I am safe. Friends and family, I wanted to let you know that I am safe and sound. I will be posting more information later, but for now take solice in the fact that I am okay. \n THIS POST WAS SET TO BE PUBLISH AUTOMATICALLY WHEN SHANE ENTERED A PASSWORD.",
               date : new Date().toDateString()
            });

            emerPost.save( function( err ) {
               console.log("\t\tEmergency Safety Post created...");
               response.redirect("/");
            });
         }
         else {
            console.log("\t\tWrong password posted...");
            response.redirect("/admin/emergencySafetyCheck");
         }
      }
      else{
         response.redirect("/");
      }
   });

});

module.exports = router;
