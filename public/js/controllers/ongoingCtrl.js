app.controller('ongoingCtrl', function($scope, $state, btlFactory, CBFactory, authFactory) {
  //authFactory.getCurrentUser();
  $scope.currentUser = authFactory.currentUser;
  $scope.allOngoing = [];
  $scope.thumbnails = [];
  $scope.vidCompetitor1Names = [];
  $scope.vidCompetitor2Names = [];
  $scope.percent = [];

  // get the name of a battle participant by his ID
  $scope.getBattleParticipant = function(whichUser, index, battleId, participantId, callback) {
    btlFactory.getBattleParticipant(battleId, participantId, "ongoing").then(function(participant) {
      $scope.currentParticipantName = participant[0].username;
      var returnObj = {
        user: $scope.currentParticipantName,
        index: index
      };
      callback(returnObj);
      // $scope.vidCompetitorsNames[index][whichUser] = participant[0].username;
    }, function(err) {
      console.log(err.data.message);
    })
  }

  $scope.ongoingUpdate = function() {
    btlFactory.getBattles('ongoing').then(function(result) {
      $scope.allOngoing = result;
      for (var i = 0; i < result.length; i++) {
        // NOTE: checking here who is the "so far" winner for calculations of the progress-bar
        if ($scope.allOngoing[i].video1Ratings.length > $scope.allOngoing[i].video2Ratings.length) {
          $scope.percent[i] = Math.round($scope.allOngoing[i].video1Ratings.length / $scope.allOngoing[i].voteGoal * 100);
          console.log("percent- vid1 winning: ", $scope.percent[i]);
        } else {
          $scope.percent[i] = Math.round($scope.allOngoing[i].video2Ratings.length / $scope.allOngoing[i].voteGoal * 100);
          console.log("percent- vid 2 winning: ", $scope.percent[i]);
        }
        $scope.getBattleParticipant(1, i, result[i]._id, result[i].user1, function(returnObj) {
          $scope.currentParticipant1Name = returnObj.user1;
          $scope.vidCompetitor1Names[returnObj.index] = returnObj.user;
          console.log("comp1: ", returnObj.user);
          console.log("i is: ", returnObj.index);
        });
        $scope.getBattleParticipant(2, i, result[i]._id, result[i].user2, function(returnObj) {
          $scope.currentParticipant2Name = returnObj.user;
          $scope.vidCompetitor2Names[returnObj.index] = returnObj.user;
          console.log("comp2: ", returnObj.user);
          console.log("i is: ", returnObj.index);
          console.log("names of all competitors so far: ");
          console.log($scope.vidCompetitor1Names);
          console.log($scope.vidCompetitor2Names);
        });
        $scope.thumbnails[i] = {
          video1: result[i].video1,
          video2: result[i].video2
        };
        $scope.thumbnails[i].video1 = $scope.getThumb($scope.thumbnails[i].video1, 'small');
        $scope.thumbnails[i].video2 = $scope.getThumb($scope.thumbnails[i].video2, 'small');
      }
    }, function(err) {
      console.log(err.data.message);
    });
  }
  $scope.ongoingUpdate();

  $scope.getCurr = function(index) {
    CBFactory.setBattle($scope.allOngoing[index]);
    $state.go('battle');
  } //getCurr

  $scope.drawProgressBar = function(index, videoVotes, voteGoal) {
    var bar = new ProgressBar.Line('#progress' + index, {
      strokeWidth: 6,
      easing: 'easeInOut',
      duration: 4500,
      color: '#FFEA82',
      trailColor: '#eee',
      trailWidth: 0,
      svgStyle: {
        width: '100%',
        height: '100%'
      },
      from: {
        color: '#ED6A5A'
      },
      to: {
        color: '#109010'
      },
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });
    var percent = (videoVotes / voteGoal);
    console.log(percent);
    bar.animate(percent); // Number from 0.0 to 1.0
  };


  // calculate completion rate percentages
  function calcPercentCompleted() {
    for (var i = 0; i < $scope.allOngoing.length; i++) {
      if ($scope.allOngoing[i].video1Ratings.length > $scope.allOngoing[i].video2Ratings.length) {
        $scope.percent[i] = $scope.allOngoing[i].video1Ratings.length / $scope.allOngoing[i].voteGoal;
        console.log("percent: ", $scope.percent[i]);
      } else {
        $scope.percent[i] = $scope.allOngoing[i].video2Ratings.length / $scope.allOngoing[i].voteGoal;
        console.log("percent: ", $scope.percent[i]);
      }
    }
  }
  calcPercentCompleted();

  window.setTimeout(function() {
    for (var i = 0; i < $scope.allOngoing.length; i++) {
      var vid1votes = $scope.allOngoing[i].video1Ratings.length;
      var vid2votes = $scope.allOngoing[i].video2Ratings.length;
      if (vid1votes > vid2votes) {
        $scope.drawProgressBar(i, vid1votes, $scope.allOngoing[i].voteGoal);
      } else {
        $scope.drawProgressBar(i, vid2votes, $scope.allOngoing[i].voteGoal);
      }
    }
  }, 2000);

});
