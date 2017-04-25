myApp.controller('myCtrl', ['$scope', function($scope) {
  $scope.showVotes = false;
  $scope.numOfVidsEnded = 0;
  $scope.video2NotStarted = true;
  $scope.video1 = 'https://www.youtube.com/watch?v=bvZolRM7ifA&t=15s';
  $scope.video2 = 'https://www.youtube.com/watch?v=-z9NwrIj6oA';

  // autoplay the first video
  $scope.playerVars = {
    autoplay: 1
  }

  $scope.pauseSecond = function(player) {
    player.stopVideo();
    $scope.showVotes = true;
    alert("now I will show vote option!");
  };

  $scope.pauseFirstBeginSecond = function(player1, player2) {
    $scope.numOfVidsEnded++;
    player1.stopVideo();
    player2.playVideo();
    $scope.video2NotStarted = false;
    $('#mybutton2').hide().delay(5 * 1000).fadeIn(500);
  };

  $scope.$on('youtube.player.ended', function ($event, player) {
    if ($scope.numOfVidsEnded == 0) { // first video ended without skipping
      var iframe = document.getElementById("second");
      iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": "playVideo",
            "id": "whateverid"
        }), "*");
      $scope.numOfVidsEnded = 1;
      // onYouTubeIframeAPIReady();
      $scope.video2NotStarted = false;
      $('#mybutton2').hide().delay(5 * 1000).fadeIn(500);
    }
    else if ($scope.numOfVidsEnded == 1) {
      $scope.showVotes = true;
      alert("now I will show vote option!");
    }
});

}]);


  // $scope.playVideo = function() {
  //   var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
  //   player.playVideo();
  // };
  //
  // $scope.stopVideo = function() {
  //   var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
  //   player.pauseVideo();
  // };
  //
  // $scope.showVideoInfo = function() {
  //   var player = ngYoutubeEmbedService.getPlayerById('stillEchoes');
  //   player.showVideoInfo();
  // };

  //
  // var tag = document.createElement('script');
  // tag.src = "https://www.youtube.com/iframe_api";
  // var firstScriptTag = document.getElementsByTagName('script')[0];
  // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  //
  // var playertwo;
  // $scope.secondPlayer = null;
  // function onYouTubeIframeAPIReady() {
  //   playertwo = new YT.Player('second', {
  //     events: {
  //       'onReady': onPlayerReady,
  //       'onStateChange': onPlayerStateChange
  //     }
  //   });
  //
  // }
  //
  // function onPlayerReady() {
  //   console.log("hey Im ready");
  //   playertwo.playVideo();
  //   //do whatever you want here. Like, player.playVideo();
  //
  // }
  //
  // function onPlayerStateChange(event) {
  //   console.log(event.data);
  //   console.log("my state changed");
  //   playertwo.pauseVideo();
  // }
