app.factory('CBFactory', function($http){
  var currentB;
  var setBattle = function(battle) {
     currentB = battle;
  }; //set
  var getBattle = function() {
    return currentB;
  };//get
  return {
    setBattle: setBattle,
    getBattle: getBattle
  };
});//factory
