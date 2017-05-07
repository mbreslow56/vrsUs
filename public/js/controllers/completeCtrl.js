app.controller('completeCtrl', function($scope, $state, btlFactory){
  $scope.allCompleted = [];
  $scope.thumbnails = [];
  

  $scope.update = function() {
    btlFactory.getBattles('completed').then(function(result){
      $scope.allCompleted = result;
      for (i=0;i<result.length;i++) {
        $scope.thumbnails[i] = {
          video1: result[i].video1,
          video2: result[i].video2
        };
        $scope.thumbnails[i].video1 = $scope.getThumb($scope.thumbnails[i].video1, 'small');
        $scope.thumbnails[i].video2 = $scope.getThumb($scope.thumbnails[i].video2, 'small');
      }//for
    }, function(error){
      console.error(error);
    })
  }//update
  $scope.update();

}); //completeCtrl
