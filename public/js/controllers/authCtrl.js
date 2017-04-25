app.controller('authCtrl', function($scope, authFactory, $state) {
  $scope.join = function() {
    authFactory.join($scope.user)
      .then(function() {
        $state.go('battle');
      }, function(err) {
        alert(err.data.message);
      });
  }
  $scope.login = function() {
    authFactory.login($scope.user)
      .then(function() {
        $state.go('battle');
      }, function(err) {
        alert(err.data);
      });
  }
  $scope.logout = function() {
    authFactory.logout($scope.user)
      .then(function() {
        $state.go('battle');
      }, function(err) {
        alert(err.data);
      });
  }
});