app.factory('btlFactory', function($http){
    var getBattles = function(state){
      return $http.get('/btls/' + state).then(function(result) {
        console.log("result from btlfactory: ");
        console.log(result.data);
        return result.data;
      }, function(error){
        throw (error);
      }) // add promise
    }// get battles of a certain state

    var getBattle = function(id, state) {
      return $http.get('/btls/' + state + '/' + id)
        .then(function(response) {
          return response.data;
        }, function(err) {
            console.error(err);
        });
    }

    // get participant of battle by ID:
    var getBattleParticipant = function(battleId, participantId, state) {
      return $http.get('/btls/' + state + '/' + battleId + '/' + participantId)
        .then(function(response) {
          return response.data;
        }, function(err) {
            console.error(err);
        });
    }

    var addBattle = function(battle){
      return $http.post('/btls/', battle).then(function(result) {
        console.log("battle made and set!");
        console.log(result.data);
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

  var updateBattle = function(battle) {
    return $http.put('/btls/' + battle._id , battle).then(function(result){
      return result.data;
    }, function(error){
      throw error;
    })
  }
  var vote = function(battle, userId) {
    return $http.put('/btls/' + battle._id + '/' + userId, battle).then(function(result){
      return result.data;
    }, function(error){
      console.error(error);
    });
  }//

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

  var updateRatings = function(battle, vidNo) {
    return $http.put('/rating/' + battle._id + '/' + vidNo).then(function(result){
      return result.data;
    }, function(error){
      throw error;
    })
  }

  return {
    getBattles: getBattles,
    getBattle: getBattle,
    getBattleParticipant: getBattleParticipant,
    addBattle: addBattle,
    updateBattle: updateBattle,
    getUserRatings: getUserRatings,
    addRatings: addRatings,
    updateRatings: updateRatings,
    vote: vote
  }
});
