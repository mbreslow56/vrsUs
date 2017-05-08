app.controller('winnerCtrl', function($scope, $state, $stateParams, btlFactory) {
  console.log($stateParams);
  console.log($stateParams.winner);

  $scope.getWinner = function(battleId) {
    btlFactory.getBattle(battleId, "completed").then(function(battle) {
      console.log("battle is: ", battle);
      $scope.winner = battle[0].winner.username;
      odoo.default({ el:'.winner-body', from: 'WINNER:', to: $scope.winner, animationDelay: 1000 });
    }, function(err) {
      console.log(err.data.message);
    })
  }
  if ($stateParams.winner !== null) {
    $scope.getWinner($stateParams.winner);
  }
  else {
    $state.go('home');
  }
});
