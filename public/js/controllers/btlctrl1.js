app.controller('btlCtrl1', function($scope, $state, $stateParams, authFactory, btlFactory) {
  $scope.user = authFactory.currentUser;
  console.log("state param is: ", $stateParams.id);

  $scope.updateUnmatched = function() {
    btlFactory.getBattles('unmatched').then(function(result) {
      $scope.allUnmatched = result;
    }, function(error) {
      throw (error);
    }); // promise callbacks
  } //update ongoing battles

  $scope.updateOngoing = function() {
    btlFactory.getBattles('ongoing').then(function(result) {
      $scope.allOngoing = result;
    }, function(error) {
      throw (error);
    }); // promise callbacks
  } //update ongoing battles

  // $scope.updateRecords = function() {
  //   btlFactory.getAllRecords().then(function(result){
  //     $scope.allRecords = result;
  //   }, function(error){
  //     throw (error);
  //   }); // promise callbacks
  // } //update ongoing battles

  if ($stateParams.id) {
    btlFactory.getBattle($stateParams.id, "unmatched").then(function(result) {
      $scope.featuredVid = result[0];
      $scope.thumb = $scope.getThumb($scope.featuredVid.video1, 'small');
      console.log("this is the featured vid");
      console.log($scope.featuredVid.video1);
    }, function(error) {
      throw error;
    });
  }
  $scope.validate = function() {
    if ($scope.numVotes < 1) {
      alert("Needs more votes!");
      return false;
    } else {
      $scope.addBattle();
    } //else
  }//validate

  $scope.addBattle = function() {
    var user = authFactory.getCurrentUser().then(function(user) {
      console.log("user from inside btlctrl: ", user);
      var btlObj = {
        state: "unmatched",
        weight: 1,
        battleName: $scope.bName,
        voteGoal: $scope.numVotes,
        user1: user._id,
        video1: $scope.vidtext,
        video1Votes: 0,
        user2: null,
        video2: null,
        video2Votes: 0,
        date: null,
        winner: null
      }
      console.log("video1 url: " + btlObj.video1);
      btlFactory.addBattle(btlObj).then(function() {
        $scope.updateUnmatched();
        alert("successfully opened a new battle!!");
        $state.go('unmatched');
      });


    }); // NOTE: we want to know who's the user exactly when the button was clicked

    //create a new unmatched battle object to push
  }; //add a new unjoined battle to the collection and update

  $scope.foundMatch = function(battle) {
    var user = authFactory.getCurrentUser().then(function(user) {
      //  authFactory.addOngoing();
      battle.user2 = user._id;
      battle.video2 = $scope.vidtext;
      battle.state = "ongoing";
      btlFactory.updateBattle(battle).then(function() { //  result unmatched just as an id?
        $scope.updateUnmatched(); // NOTE: $scope.allUnmatched changes here
        // NOTE maybe add more functionality here?
      }); // deleting callback
      alert("added ongoing battle.");
      //  $scope.updateOngoing();
      $state.go('ongoing');
    }); // add ongoing callback
  } // getCurrentUser callback  NOTE: TRANSITION: UNMATCHED==> ONGOING BATTLE

  $scope.finishBattle = function(battle, userId) {
    battle.date = new Date();
    battle.winner = userId;
    battle.state = "completed";
    //$state.go('home'); // to be added: winner screen!!
  }; //finishBattle NOTE: TRANSITION: ONGOING BATTLE ===> RECORD

  $scope.getVidId = function() {
    $scope.videourl = $scope.vidtext;
    console.log("url is", $scope.videourl);
    var videoid = $scope.videourl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if (videoid != null) {
      console.log("video id = ", videoid[1]);
      $scope.vidid = videoid[1];
    } else {
      console.log(videoid);
      alert("The youtube url is not valid.");
    } // else
  } //getVidId

  // $scope.updateUnmatced(); //NOTE: should run on start- up. maybe put on a different place
  // $scope.updateOngoing();
});
