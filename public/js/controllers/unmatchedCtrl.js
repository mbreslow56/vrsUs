app.controller('unmatchedCtrl', function($sce, $scope, btlFactory) {
  $scope.allUnmatched = [];

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

  $scope.unmatchedUpdate = function() {
    btlFactory.getBattles('unmatched').then(function(result) {
      $scope.allUnmatched = result;
      for (var i = 0; i < result.length; i++) {
        console.log("vid object: ");
        console.log(result[i]);
        console.log(result[i].video1);
        var url = result[i].video1.replace("watch?v=", "embed/");
        console.log(url);
        $scope.allUnmatched[i].video1 = url;
      }
      //console.log($scope.allUnmatched);
    });
  }

  $scope.unmatchedUpdate();
});
