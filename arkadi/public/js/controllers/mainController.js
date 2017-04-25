myApp.controller('myCtrl', ['$scope', 'ngYoutubeEmbedService', function($scope, ngYoutubeEmbedService) {
  $scope.isSecondVidReady = false;

  $scope.video1 = 'https://www.youtube.com/watch?v=E813VYySueM';

  $scope.video2 = 'https://www.youtube.com/watch?v=SCVvhUW7cxo';

  $scope.video3 = 'https://www.youtube.com/watch?v=OPmOXJtxxoo';

  $scope.video4 = 'https://gaming.youtube.com/watch?v=P_XwcUdSS1M';

  $scope.video5 = 'https://www.youtube.com/watch?v=OCmBWOF1A0g';

  $scope.video6 = 'https://www.youtube.com/watch?v=bvZolRM7ifA&t=15s';

  $scope.video7 = 'https://www.youtube.com/watch?v=-z9NwrIj6oA';

  $scope.playVideo = function() {
    var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
    player.playVideo();
  };

  $scope.stopVideo = function() {
    var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
    player.pauseVideo();
  };

  $scope.showVideoInfo = function() {
    var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
    player.showVideoInfo();
  };

  $('#mybutton').on('click', function () {
    var player1 = ngYoutubeEmbedService.getPlayerById('whtbb');
    var player2 = ngYoutubeEmbedService.getPlayerById('brain-game');
    $scope.isSecondVidReady = true;
    player1.pauseVideo();
    player2.playVideo();
  });

  $scope.stateChanged = function(e) {
    console.log(e);
  };
}]);
