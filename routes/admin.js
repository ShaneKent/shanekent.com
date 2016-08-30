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
   console.log("\tAdmin Posting - Post request made to shanekent.com/admin" + request.url);

   var passedPassword = request.body.password;

   Password.findOne({ }, function( error, passObj ){

      if (passObj != undefined){
         if (passObj.password == passedPassword){
            console.log("\t\tPOSTING AN EMERGENCY SAFETY CHECK. THIS IS NOT A DRILL.");

            var emerPost = Post({
               title : "EMERGENCY SAFETY CHECK",
               text : "I am safe. Friends and family, I wanted to let you know that even with the recent events taking place in my area I am safe. I will be posting more information later, but for now take solice in the fact that I am okay. \n\n THIS POST WAS SET TO BE PUBLISH AUTOMATICALLY WHEN SHANE ENTERED A PASSWORD.",
               date : new Date().toDateString() + ", " + new Date().toLocaleTimeString(),
               orderDate : new Date().getTime()
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

router.post("/newPost", function( request, response ) {
   console.log("\tAdmin Posting - Post request made to shanekent.com/admin" + request.url);

   var passedPassword = request.body.password;
   var passedTitle    = request.body.title;
   var passedText     = request.body.text;

   var passedPhotos   = request.body.photos
   var passedVideos   = request.body.videos

   if (passedPhotos == [""]) {
      passedPhotos = [];
   } else {
      passedPhotos = passedPhotos.split(' , ');
   }

   if (passedVideos == [""]) {
      passedVideos = [];
   } else {
      passedVideos = passedVideos.split(' , ');
   }

   Password.findOne({ }, function( error, passObj ){

      if (passObj != undefined){
         if (passObj.password == passedPassword){
            console.log("\t\tPassword was correct... Creating new post.");

            var newPost = Post({
               title : passedTitle,
               text : passedText,
               photos : passedPhotos,
               videos : passedVideos,
               date : new Date().toDateString() + ", " + new Date().toLocaleTimeString(),
               orderDate : new Date().getTime()
            });

            newPost.save( function( err ) {
               console.log("\t\tNew post created...");
               response.redirect("/");
            });
         }
         else {
            console.log("\t\tWrong password posted...");
            response.redirect("/admin/createNewPost");
         }
      }
      else{
         response.redirect("/");
      }
   });
});

module.exports = router;
