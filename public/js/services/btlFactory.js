app.factory('btlFactory', function($http){

    var getBattles = function(state){
      return $http.get('/btls/'+state).then(function(result) {
        return result.data;
      }, function(error){
        throw (error);
      }) // add promise
    }// get battles of a certain state

    var addBattle = function(battle){
      return $http.post('/btls/', battle).then(function(result) {
        console.log("battle made and set!");
        return result.data;
      }, function(error){
        throw (error);
      }) // add promise
    }// addOnGoing

  var deleteBattle = function(oId) {
    return $http.delete('/btls/' + oId).then(function(result){
      console.log("ongoing battle that was deleted: ", result);
      return result.data; //??
    }, function(error){
      throw (error);
    }) //promise callbacks
  }// delete a battle
  var updateBattle(battle) {
    return $http.put('/btls/' + battle._id , battle).then(function(result){
      return result.data;
    }, function(error){
      throw error;
    })
  }

  var getUserRatings = function(id) {
    return $http.get('/rating/' + id).then(function(result){
      return result.data;
    }, function(error){
    throw (error);
  }) //promise callbacks
} //getAll ratings of a user

var addRatings = function(rating) {
  return $http.post('/rating', rating).then(function(result){
    return result.data;
  }, function(error){
    throw error;
  })
}

  var updateRatings(battle, vidNo) {
    return $http.put('/rating/' + battle._id + '/' + vidNo).then(function(result){
      return result.data;
    }, function(error){
      throw error;
    })
  }
  return {
    getBattles: getBattles,
    addBattle: addBattle,
    updateBattle: updateBattle,
    getUserRatings: getUserRatings,
    addRatings: addRatings,
    updateRatings: updateRatings
  }
});
