app.controller('myCtrl', function($scope, authFactory, btlFactory, CBFactory) { //, authfactory
  $scope.currentBattle = CBFactory.getBattle();
  $scope.currentUser = authFactory.currentUser.username;
  $scope.showVotes = false;
  $scope.numOfVidsEnded = 0;
  $scope.video2NotStarted = true;
  $scope.video1 = "'"+$scope.currentBattle.video1+"'";
  $scope.video2 = "'"+$scope.currentBattle.video2+"'";
  $scope.videoArr = [{video: $scope.currentBattle.video1, votes: $scope.currentBattle.video1Votes}, {video: $scope.currentBattle.video2, votes: $scope.currentBattle.video2Votes}];

  function drawFirstCircleBar(videoVotes) {
    var bar = new ProgressBar.Circle(graph, {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      duration: 3000,
      text: {
        autoStyleContainer: false
      },
      from: { color: '#ED6A5A', width: 1 },
      to: { color: '#087830', width: 4 },
      // Set default step function for all animate calls
      step: function(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        var value = Math.round(circle.value() * $scope.currentBattle.voteGoal);
        if (value === 0) {
          circle.setText('');
        } else {
          circle.setText(value + "/" + $scope.currentBattle.voteGoal);
        }
      }
    } );
    bar.animate(videoVotes / $scope.currentBattle.voteGoal);  // Number from 0.0 to 1.0
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
  }

    function drawSecondCircleBar(videoVotes) {
      var bar = new ProgressBar.Circle(graph2, {
        color: '#aaa',
        // This has to be the same size as the maximum width to
        // prevent clipping
        strokeWidth: 4,
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 3000,
        text: {
          autoStyleContainer: false
        },
        from: { color: '#ED6A5A', width: 1 },
        to: { color: '#087830', width: 4 },
        // Set default step function for all animate calls
        step: function(state, circle) {
          circle.path.setAttribute('stroke', state.color);
          circle.path.setAttribute('stroke-width', state.width);

          var value = Math.round(circle.value() * $scope.currentBattle.voteGoal);
          if (value === 0) {
            circle.setText('');
          } else {
            circle.setText(value + "/" + $scope.currentBattle.voteGoal);
          }
        }
      });

      bar.animate(videoVotes / $scope.currentBattle.voteGoal);  // Number from 0.0 to 1.0
      bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
      bar.text.style.fontSize = '2rem';
    }// drawSecondCircleBar



  // randomize the order of the 2 vids //
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  $scope.videoArr = shuffle($scope.videoArr);
  $scope.video1 = $scope.videoArr[0].video;
  $scope.video2 = $scope.videoArr[1].video;
  $scope.video1Votes = $scope.videoArr[0].votes;
  $scope.video2Votes = $scope.videoArr[1].votes;


  $(document).ready(function() {
    $('#mybutton').hide().delay(5 * 1000).fadeIn(500);
  });

  // autoplay the first video
  $scope.player1Vars = {
    autoplay: 1,
    start: 0.01 // start at the beginning
  }

  // start the second video from the beginning
  $scope.player2Vars = {
    start: 0.01
  }

  $scope.pauseSecond = function(player) {
    player.stopVideo();
    $scope.showVotes = true;
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
    }
});

// voting functionality below
var checkWin = function(battle) {

}//checkWin

$scope.voted = function(numVideo) { //
  console.log("this is the current user:");
  console.log($scope.currentUser);
  $scope.btlCopy = $scope.currentBattle;
  if (numVideo===1) {
      $scope.currentBattle.video1Ratings.push($scope.currentUser._id);
    } else {
      $scope.currentBattle.video2Ratings.push($scope.currentUser._id);
    } //else
    btlFactory.vote($scope.currentBattle, $scope.currentUser._id).then(function(result){
      // checkWin happens in the server. if it wins, return the new battle with updated ratings
      drawFirstCircleBar($scope.currentBattle.video1Ratings.length);
      drawSecondCircleBar($scope.currentBattle.video2Ratings.length);
      $scope.copyBtl = null;
      if (result.winner) {
        alert("winning vote");
      } else {
        console.log("not winning vote");
      }//else
    }, function(error){
      $scope.currentBattle = btlCopy;
    })
  }// voted


  //   btlFactory.updateVotes(battle).then(function(result){
  //     if ((battle.video1Votes === battle.voteGoal)||(battle.video2Votes===battle.voteGoal)) { //wanna say >= but that SHOULDNT happen
  //       $scope.finishBattle(battle);
  //     } else {
  //       //display result progress bars and related videos. which Im not sure how to tackle
  //     }// else voting commented but no winner yet
  //   }, function(error){
  //     throw error;
  //   }) //update callback
  // }//get current user callback
// voted function

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
