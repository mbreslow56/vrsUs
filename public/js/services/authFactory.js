app.factory('authFactory', function($http) {
  var auth = {};
  auth.currentUser = {};
  auth.join = function(user) {
    return $http.post('/users/join', user)
      .then(function(response) {
        auth.currentUser = angular.copy(response.data)
      });
  };

  auth.login = function(user) {
    return $http.post('/users/login', user)
      .then(function(response) {
        console.log(response.data)
        auth.currentUser = angular.copy(response.data)
      });
  };

  auth.getCurrentUser = function() {
    return $http.get('/users/currentUser')
      .then(function(response) {
        auth.currentUser = angular.copy(response.data);
        return response.data;
      })
  }

  auth.logout = function(user) {
    return $http.get('/users/logout')
      .then(function(reponse) {
        auth.currentUser.username = null;
        console.log("auth logout");
      })
  }

  return auth;
});
