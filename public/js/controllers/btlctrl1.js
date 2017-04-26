app.controller( 'btlCtrl1', function($scope, authFactory, btlFactory){
  $scope.user = authFactory.currentUser;

  $scope.getUnjoined = function() {

  }; //get all unjoined battles from server. also: //unjoinedUpdate
  $scope.addUnjoined = function() {
    var user = authFactory.getCurrentUser().then(function(user){

      console.log("user from inside btlctrl: ", user);
      var umObj = {
        battleName: $scope.bName,
        user: user._id,
        video: $scope.videourl,
        numVotes: $scope.numVotes
      }
      //console.log("number of votes: " + umObj.numVotes);
      btlFactory.addUnjoined(umObj).then(function(){
        //update??
        console.log("successfully joined");
      });


    }); // NOTE: we want to know who's the user exactly when the button was clicked

    //create a new unmatched battle object to push
  }; //add a new unjoined battle to the collection and update

  $scope.foundMatch = function() {
     authFactory.addOngoing();
  }

  $scope.getOngoing = function(){

  }; // get all ongoing battles. MIGHT RELOCATE
  $scope.addOngoing = function(){

  }; // add a new ongoing battle. delete corresponding unjoined instance
  $scope.getVidId = function(){
  $scope.videourl = $scope.vidtext;
  console.log("url is", $scope.videourl);
  var videoid = $scope.videourl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  if(videoid != null) {
  console.log("video id = ",videoid[1]);
  $scope.vidid = videoid[1];
} else {
  console.log(videoid);
  alert("The youtube url is not valid.");
}
}
});
