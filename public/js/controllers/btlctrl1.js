app.controller( 'btlCtrl1', function($scope, authFactory, btlFactory){
  $scope.user = authFactory.currentUser;

  $scope.getUnjoined = function() {

  }; //get all unjoined battles from server. also: //unjoinedUpdate
  $scope.addUnjoined = function() {
    var user = $rootScope.currentUser;
    console.log("user object from inside btlctrl: ", user);
    var umObj = {
      battleName: $scope.bName,
      user: user._id,
      video: $scope.videourl,
    }
    btlFactory.addUnjoined(umObj).then(function(){
      //update??
    });
    //create a new unmatched battle object to push
  }; //add a new unjoined battle to the collection and update
  $scope.getOngoing = function(){

  }; // get all ongoing battles. MIGHT RELOCATE
  $scope.addOngoing = function(){

  }; // add a new ongoing battle. delete corresponding unjoined instance
  $scope.getVidId = function(){
  $scope.videourl = $scope.vidtext;
  console.log("url is", url);
  var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  if(videoid != null) {
  console.log("video id = ",videoid[1]);
  $scope.vidid = videoid[1];
} else {
  console.log(videoid);
  alert("The youtube url is not valid.");
}
}
});
