app.controller( 'btlCtrl1', function($scope, btlFactory, authFactory){
  $scope.user = authFactory.currentUser.username;
  
  $scope.getUnjoined = function() {

  }; //get all unjoined battles from server. also: //unjoinedUpdate
  $scope.addUnjoined = function() {
    var user = $rootScope.currentUser;
    var url = $stateParams.user;
  }; //add a new unjoined battle to the collection and update
  $scope.getOngoing = function(){

  }; // get all ongoing battles. MIGHT RELOCATE
  $scope.addOngoing = function(){

  }; // add a new ongoing battle. delete corresponding unjoined instance
  $scope.getVidId = function(){
  var url = $scope.vidtext;
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
