app.controller('myCtrl', function($scope, authFactory, btlFactory, CBFactory) { //, authfactory
  $scope.currentUser = authFactory.currentUser.username;
  var currentUserId = authFactory.currentUser._id;
  console.log("current myctrl user", authFactory.currentUser);
  $scope.currentBattle = CBFactory.getBattle();
  $scope.showVotes = false; // for displaying results
  $scope.didVote = false; // already voted alert
  $scope.afterVote = false; //voted successfully alert
  $scope.pressedVote = false; // just pressed either vote button
  $scope.numOfVidsEnded = 0;
  $scope.video2NotStarted = true;
  $scope.video1 = $scope.currentBattle.video1;
  $scope.video2 = $scope.currentBattle.video2;
  console.log($scope.currentBattle);
  console.log($scope.video1);
  console.log($scope.video2);
  $scope.battleName = $scope.currentBattle.battleName;
  $scope.videoArr = [{
    video: $scope.currentBattle.video1,
    votes: $scope.currentBattle.video1Votes
  }, {
    video: $scope.currentBattle.video2,
    votes: $scope.currentBattle.video2Votes
  }];

  $scope.alreadyVoted = function(userId, battle) {
    var voted = false;
    if (battle.video1Ratings) {
      for (var i = 0;i<battle.video1Ratings.length;i++) {
        if (userId===battle.video1Ratings[i]) {
          voted = true;
        }//if
      }// first for
    }//if votes array 1 exists
    if (battle.video2Ratings) {
      for (i = 0;i<battle.video2Ratings.length;i++) {
        if (userId===battle.video1Ratings[i]) {
          voted = true;
        }//if
      }// second for
    }
    if (voted===true) {
      $scope.didVote = true;
    }
    return voted;
  }// already voted

  function drawFirstCircleBar(videoVotes) {
    var bar = new ProgressBar.Circle(graph, {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 6,
      trailWidth: 6,
      easing: 'easeInOut',
      duration: 3000,
      text: {
        autoStyleContainer: false
      },
      from: {
        color: '#ED6A5A',
        width: 6
      },
      to: {
        color: '#087830',
        width: 6
      },
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
    bar.animate(videoVotes / $scope.currentBattle.voteGoal); // Number from 0.0 to 1.0
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
  }

  function drawSecondCircleBar(videoVotes) {
    var bar = new ProgressBar.Circle(graph2, {
      color: '#aaa',
      // This has to be the same size as the maximum width to
      // prevent clipping
      strokeWidth: 6,
      trailWidth: 6,
      easing: 'easeInOut',
      duration: 3000,
      text: {
        autoStyleContainer: false
      },
      from: {
        color: '#ED6A5A',
        width: 6
      },
      to: {
        color: '#087830',
        width: 6
      },
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

    bar.animate(videoVotes / $scope.currentBattle.voteGoal); // Number from 0.0 to 1.0
    bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
    bar.text.style.fontSize = '2rem';
  } // drawSecondCircleBar



  // randomize the order of the 2 vids //
  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue, randomIndex;
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

  // NOTE: diabled shuffle feature for now
  // $scope.videoArr = shuffle($scope.videoArr);
  // $scope.video1 = $scope.videoArr[0].video;
  // $scope.video2 = $scope.videoArr[1].video;

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

  $scope.$on('youtube.player.ended', function($event, player) {
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
    } else if ($scope.numOfVidsEnded == 1) {
      $scope.showVotes = true;
    }//else if
  });

  // voting functionality below
  var checkWin = function(battle) {

  } //checkWin

  $scope.voted = function(numVideo) { //
    $scope.pressedVote = true;
    $scope.video2NotStarted = true;
    if (!$scope.alreadyVoted(currentUserId, $scope.currentBattle)) {
    $scope.btlCopy = $scope.currentBattle;
    if (numVideo === 1) {
      $scope.currentBattle.video1Ratings.push(authFactory.currentUser._id);
    } else {
      $scope.currentBattle.video2Ratings.push(authFactory.currentUser._id);
    } //else
    btlFactory.vote($scope.currentBattle, authFactory.currentUser._id).then(function(result) {
      // checkWin happens in the server. if it wins, return the new battle with updated ratings
      drawFirstCircleBar($scope.currentBattle.video1Ratings.length);
      drawSecondCircleBar($scope.currentBattle.video2Ratings.length);
      $scope.copyBtl = null;
      if (result.winner) {
        alert("winning vote");
      } else {
        console.log("not winning vote");
      } //else
      $scope.afterVote = true;
    }, function(error) {
      $scope.currentBattle = btlCopy;
    })
  } else {
    drawFirstCircleBar($scope.currentBattle.video1Ratings.length);
    drawSecondCircleBar($scope.currentBattle.video2Ratings.length);
  } // else alreaddy voted
  $scope.showVotes = false; //hide buttons
  } // voted

});
