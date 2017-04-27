app.controller('unmatchedCtrl', function($sce, $scope, btlFactory) {
  $scope.allUnmatched = [];

  $scope.trustSrc = function(src) {
   return $sce.trustAsResourceUrl(src);
 }

  $scope.unmatchedUpdate = function(){
  btlFactory.getAllUnmatched().then(function(result){
    $scope.allUnmatched = result;
    for (var i = 0; i < result.length; i++) {
      console.log(result[i].video);
      var url = result[i].video.replace("watch?v=", "embed/");
      console.log(url);
      $scope.allUnmatched[i].video = url;
    }
    //console.log($scope.allUnmatched);
  });
}

  $scope.unmatchedUpdate();


});
