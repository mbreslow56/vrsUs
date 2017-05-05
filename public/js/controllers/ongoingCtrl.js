app.controller('ongoingCtrl', function($scope, $state, btlFactory, CBFactory, authFactory) {
  authFactory.getCurrentUser();
  $scope.currentUser = authFactory.currentUser;
  $scope.allOngoing = [];
  $scope.thumbnails = [];
  $scope.vidCompetitor1Names = [];
  $scope.vidCompetitor2Names = [];

  // get the name of a battle participant by his ID
  $scope.getBattleParticipant = function(whichUser, index, battleId, participantId, callback) {
    btlFactory.getBattleParticipant(battleId, participantId, "ongoing").then(function(participant) {
        $scope.currentParticipantName = participant[0].username;
        var returnObj = {user: $scope.currentParticipantName, index: index};
        callback(returnObj);
      // $scope.vidCompetitorsNames[index][whichUser] = participant[0].username;
    }, function(err) {
      console.log(err.data.message);
    })
  }

  $scope.ongoingUpdate = function(){
    btlFactory.getBattles('ongoing').then(function(result){
      $scope.allOngoing = result;
      for (var i = 0; i < result.length; i++) {
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
        $scope.thumbnails[i] = {video1: result[i].video1, video2: result[i].video2};
        $scope.thumbnails[i].video1 = $scope.getThumb($scope.thumbnails[i].video1, 'small');
        $scope.thumbnails[i].video2 = $scope.getThumb($scope.thumbnails[i].video2, 'small');
      }
    }, function(err) {
      console.log(err.data.message);
    });
}
  $scope.ongoingUpdate();

  $scope.getCurr = function(index){
    CBFactory.setBattle($scope.allOngoing[index]);
    $state.go('battle');
  }//getCurr

  function drawProgressBar(videoVotes, voteGoal){
      var bar = new ProgressBar.Line('#progress' + $scope.$index, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 3000,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {width: '100%', height: '100%'},
        from: {color: '#109010'},
        to: {color: '#ED6A5A'},
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
        }
      });
      var percent = (videoVotes/voteGoal);
      $scope.percent = Math.round(videoVotes/voteGoal * 100);
      console.log(percent);
      bar.animate(percent);  // Number from 0.0 to 1.0
  };

  $scope.videoVotes = 14;
  $scope.voteGoal = 16;
  window.setTimeout(function(){
    drawProgressBar($scope.videoVotes, $scope.voteGoal);
  }, 10);

});
