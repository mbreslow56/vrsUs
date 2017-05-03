app.factory('CBFactory', function($http){
  var currentB;
  var setBattle = function(battle) {
     currentB = battle;
     console.log("battle has been set io", currentB);
  }; //set
  var getBattle = function() {
    console.log("battle is", currentB);
    return currentB;
  };//get
  return {
    setBattle: setBattle,
    getBattle: getBattle
  };
});//factory
