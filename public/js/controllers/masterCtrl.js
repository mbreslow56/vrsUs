app.controller('masterCtrl', function($scope, authFactory) {
  $scope.currentUser = authFactory.currentUser;
  authFactory.getCurrentUser();
});