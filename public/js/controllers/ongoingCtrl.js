app.controller('ongoingCtrl', function($scope, $state, btlFactory, CBFactory, authFactory) {
  authFactory.getCurrentUser();
  $scope.currentUser = authFactory.currentUser;
  $scope.allOngoing = [];
  $scope.thumbnails = [];

  $scope.ongoingUpdate = function(){
    btlFactory.getBattles('ongoing').then(function(result){
      $scope.allOngoing = result;
      for (var i = 0; i < result.length; i++) {
        //console.log(result);
        $scope.thumbnails[i] = {video1: result[i].video1, video2: result[i].video2};
        $scope.thumbnails[i].video1 = $scope.getThumb($scope.thumbnails[i].video1, 'small');
        $scope.thumbnails[i].video2 = $scope.getThumb($scope.thumbnails[i].video2, 'small');
      }
    });
}
  $scope.ongoingUpdate();

  $scope.getCurr =function(index){
    CBFactory.setBattle($scope.allOngoing[index]);
    $state.go('battle');
  }//getCurr

});
