app.controller('unmatchedCtrl', function($scope, btlFactory) {
  console.log("unmatched controller");

  btlFactory.getAllUnmatched().then(function(result){
    console.log("hi");
  });

  // $scope.video1 = 'https://www.youtube.com/watch?v=bvZolRM7ifA&t=15s';
  // $scope.video2 = 'https://www.youtube.com/watch?v=-z9NwrIj6oA';


  $scope.videos = [];


//
//   $scope.showVotes = false;
//   $scope.numOfVidsEnded = 0;
//   $scope.video2NotStarted = true;
//
//   $scope.video1Votes = 12;
//   $scope.video2Votes = 15;
//   $scope.voteLimit = 16;
//   $scope.video1 = 'https://www.youtube.com/watch?v=bvZolRM7ifA&t=15s';
//   $scope.video2 = 'https://www.youtube.com/watch?v=-z9NwrIj6oA';
//   $scope.videoArr = [{video: $scope.video1, votes: $scope.video1Votes}, {video: $scope.video2, votes: $scope.video2Votes}];
//
//   // randomize the order of the 2 vids //
//   function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
//
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
//
//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
//     return array;
//   }
//
//   $scope.videoArr = shuffle($scope.videoArr);
//   $scope.video1 = $scope.videoArr[0].video;
//   $scope.video2 = $scope.videoArr[1].video;
//   $scope.video1Votes = $scope.videoArr[0].votes;
//   $scope.video2Votes = $scope.videoArr[1].votes;
//   console.log("video 1 votes: " + $scope.video1Votes);
//   console.log("video 2 votes: " + $scope.video2Votes);
//
//   $(document).ready(function() {
//     $('#mybutton').hide().delay(5 * 1000).fadeIn(500);
//   });
//
//   // autoplay the first video
//   $scope.player1Vars = {
//     autoplay: 1,
//     start: 0.01 // start at the beginning
//   }
//
//   // start the second video from the beginning
//   $scope.player2Vars = {
//     start: 0.01
//   }
//
//   $scope.pauseSecond = function(player) {
//     player.stopVideo();
//     $scope.showVotes = true;
//   };
//
//   $scope.pauseFirstBeginSecond = function(player1, player2) {
//     $scope.numOfVidsEnded++;
//     player1.stopVideo();
//     player2.playVideo();
//     $scope.video2NotStarted = false;
//     $('#mybutton2').hide().delay(5 * 1000).fadeIn(500);
//   };
//
//   $scope.$on('youtube.player.ended', function ($event, player) {
//     if ($scope.numOfVidsEnded == 0) { // first video ended without skipping
//       var iframe = document.getElementById("second");
//       iframe.contentWindow.postMessage(JSON.stringify({
//             "event": "command",
//             "func": "playVideo",
//             "id": "whateverid"
//         }), "*");
//       $scope.numOfVidsEnded = 1;
//       // onYouTubeIframeAPIReady();
//       $scope.video2NotStarted = false;
//       $('#mybutton2').hide().delay(5 * 1000).fadeIn(500);
//     }
//     else if ($scope.numOfVidsEnded == 1) {
//       $scope.showVotes = true;
//     }
// });
//
// // voting functionality below
// $scope.showVidRank = function(whichVid) {
//   if (whichVid == 1) {
//     $scope.video1Votes++;
//   }
//   else {
//     $scope.video2Votes++;
//   }
//   drawFirstCircleBar($scope.video1Votes, $scope.voteLimit);
//   drawSecondCircleBar($scope.video2Votes, $scope.voteLimit);
// }

});
