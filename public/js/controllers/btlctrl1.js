app.controller( 'btlCtrl1',['$scope', 'authFactory','$state', function($scope, authFactory, $state){
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
}]);
