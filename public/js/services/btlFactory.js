app.factory('btlFactory', function($http){
  var addUnjoined = function(btl) {
    return $http.post('/btls/unjoined', btl)
    .then(function(response){
      console.log(response);
    });
  }// creating a new unjoined battle
  return {
    addUnjoined: addUnjoined
  }
});
