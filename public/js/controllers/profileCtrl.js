app.controller('profileCtrl', function($scope, btlFactory, authFactory) {
  $scope.currentUser = authFactory.currentUser.username;
  $scope.artistWins = 0;
  $scope.voterWins = 0;
  $scope.whichBtlsWon = [false];
  $scope.amICreator = [false];
  $scope.allMyCompleted = [];
  $scope.allMyOngoing = [];
  $scope.allMyunmatched = [];

  $scope.getMyCompletedBtls = function() {
    btlFactory.getBattles('completed').then(function(result) {
      $scope.allMyCompleted = result;
      console.log("length of res: ", result.length);
      for(var i = 0; i < result.length; i++) {
        console.log("first: ", result[i].user1.username);
        console.log("second: ", result[i].user2.username);
        if (result[i].user1._id !== authFactory.currentUser._id && result[i].user2._id !== authFactory.currentUser._id) {
          $scope.allMyCompleted.splice(i, 1);
        }
      }
      for(var i = 0; i < $scope.allMyCompleted.length; i++) {
        console.log("username of winner: ", $scope.allMyCompleted[i].winner.username);
        console.log("my name: ", $scope.currentUser);
        if ($scope.allMyCompleted[i].winner.username === $scope.currentUser) {
          $scope.whichBtlsWon[i] = true;
          $scope.howMuchVotesWhenWon = $scope.allMyCompleted[i].voteGoal;
          if ($scope.allMyCompleted[i].user1 === authFactory.currentUser._id) {
            $scope.amICreator[i] = true;
          }
        }
        else {
          if ($scope.allMyCompleted[i].user1 === authFactory.currentUser._id) {
            $scope.amICreator[i] = true;
            $scope.howMuchVotesWhenWon = $scope.allMyCompleted[i].video1Ratings.length;
          }
          else {
            $scope.howMuchVotesWhenWon = $scope.allMyCompleted[i].video2Ratings.length;
          }
        }

      }
    }, function(error) {
      console.error(error);
    })
  }

  $scope.getMyCompletedBtls();

  if (typeof(authFactory.currentUser.artistWins) !== 'undefined') {
    $scope.artistWins = authFactory.currentUser.artistWins;
  }
  if (typeof(authFactory.currentUser.voterWins) !== 'undefined') {
    console.log(authFactory.currentUser);
    $scope.voterWins = authFactory.currentUser.voterWins;
  }

});
