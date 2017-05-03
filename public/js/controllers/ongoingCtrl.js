app.controller('ongoingCtrl', function($scope, $location, btlFactory) {
  $scope.allOngoing = [];
  $scope.thumbnails = [];

  $scope.ongoingUpdate = function(){
    btlFactory.getBattles('ongoing').then(function(result){
      $scope.allOngoing = result;
      for (var i = 0; i < result.length; i++) {
        console.log(result);
        $scope.thumbnails[i] = {video1: result[i].video1, video2: result[i].video2};
        $scope.thumbnails[i].video1 = $scope.getThumb($scope.thumbnails[i].video1, 'small');
        $scope.thumbnails[i].video2 = $scope.getThumb($scope.thumbnails[i].video2, 'small');
        console.log($scope.thumbnails[i].video1);
        console.log($scope.thumbnails[i].video2);
        console.log($scope.thumbnails[i]);
      }
    });
}

  $scope.ongoingUpdate();
  $scope.getCurr =function(battle){
    $scope.SelectedBattle = battle;
    $location.path('/battle');
  }//getCurr


  // voting function from btlCtrl1
  // finishBattle

});
