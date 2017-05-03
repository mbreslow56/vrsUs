app.controller('ongoingCtrl', function($scope, $location, btlFactory) {
  $scope.allOngoing = [];
  $scope.thumbnails = [];

  $scope.ongoingUpdate = function(){
    btlFactory.getBattles('ongoing').then(function(result){
      $scope.allOngoing = result;
      for (var i = 0; i < result.length; i++) {
        console.log(result);
        $scope.thumbnails[i] = {video1: result[i].video1, video2: result[i].video2};
        $scope.thumbnails[i].video1 = getThumbnail.thumb($scope.thumbnails[i].video1, 'small');
        $scope.thumbnails[i].video2 = getThumbnail.thumb($scope.thumbnails[i].video2, 'small');
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

    var getThumbnail = (function () {
    var video, results;

    var getThumb = function (url, size) {
        if (url === null) {
            return '';
        }
        size    = (size === null) ? 'big' : size;
        results = url.match('[\\?&]v=([^&#]*)');
        video   = (results === null) ? url : results[1];

        if (size === 'small') {
            return 'http://img.youtube.com/vi/' + video + '/2.jpg';
        }
        return 'http://img.youtube.com/vi/' + video + '/0.jpg';
    };

    return {
        thumb: getThumb
    };
}());

$scope.thumb1 = getThumbnail.thumb('https://www.youtube.com/watch?v=bvZolRM7ifA&t=15s', 'small');
$scope.thumb2 = getThumbnail.thumb('https://www.youtube.com/watch?v=-z9NwrIj6oA', 'small');

console.log($scope.thumb1);
console.log($scope.thumb2);

});
