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


  // voting function from btlCtrl1
  // finishBattle

//     var getThumbnail = (function () {
//     var video, results;
//
//     var getThumb = function (url, size) {
//         if (url === null) {
//             return '';
//         }
//         size    = (size === null) ? 'big' : size;
//         results = url.match('[\\?&]v=([^&#]*)');
//         video   = (results === null) ? url : results[1];
//
//         if (size === 'small') {
//             return 'http://img.youtube.com/vi/' + video + '/2.jpg';
//         }
//         return 'http://img.youtube.com/vi/' + video + '/0.jpg';
//     };
//
//     return {
//         thumb: getThumb
//     };
// }());

});
