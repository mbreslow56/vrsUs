app.factory('btlFactory', function($http){
  var getUnmatched = function(id) {
    return $http.get('/btls/unjoined/' + id)
      .then(function(response) {
        return response.data;
      }, function(err) {
          console.error(err);
      });
  }
  var addUnmatched = function(btl) {
    return $http.post('/btls/unjoined', btl)
    .then(function(response){
      console.log(response);
    }, function(error){
      throw (error);
    }); // $http callback
  }// creating a new unjoined battle

  var deleteUnmatched = function(uId) {
    return $http.delete('/btls/unjoined/'+uId).then(function(result){
      console.log("unmatched battle that was deleted: ", result);
      return result.data; //??
    }, function(error){
      throw (error);
    })
  }// deleteUnmatched

  var getAllUnmatched = function() {
    return $http.get('/btls/unjoined').then(function(result){
      return result.data;
    }, function(error){
    throw (error);
  }) //promise callbacks
} //getAllUnmatched

    var addOnGoing = function(battle){
      return $http.post('/btls/ongoing', battle).then(function(result) {
        console.log("battle made and set!");
        return result.data;
      }, function(error){
        throw (error);
      }) // add promise
    }// addOnGoing

  var deleteOngoing = function(oId) {
    return $http.delete('/btls/ongoing/'+oId).then(function(result){
      console.log("ongoing battle that was deleted: ", result);
      return result.data; //??
    }, function(error){
      throw (error);
    }) //promise callbacks
  }// deleteOngoing

  var getAllOngoing = function() {
    return $http.get('/btls/ongoing').then(function(result){
      return result.data;
    }, function(error){
    throw (error);
  }) //promise callbacks
  } //getAllOngoing

  var updateVotes(battle) {
    return $http.put('/btls/ongoing/'+battle._id, battle).then(function(result){
      return result.data;
    }, function(error){
      throw error;
    })
  }
  var getAllRecords = function() {
    return $http.get('/btls/records').then(function(result){
      return result.data;
    }, function(error){
    throw (error);
  }) //promise callbacks
} //getAllrecords

var addRecord = function(record){
  return $http.post('/btls/record',record ).then(function(result) {
    console.log("record made and set in time!");
    return result.data;
  }, function(error){
    throw (error);
  }) // add promise
}// addRecord

  return {
    addUnmatched: addUnmatched,
    deleteUnmatched: deleteUnmatched,
    getAllUnmatched: getAllUnmatched,
    getUnmatched: getUnmatched,
    addOnGoing: addOnGoing,
    deleteOngoing: deleteOngoing,
    getAllOngoing: getAllOngoing,
    updateVotes: updateVotes,
    getAllRecords: getAllRecords,
    addRecord: addRecord
  }
});
