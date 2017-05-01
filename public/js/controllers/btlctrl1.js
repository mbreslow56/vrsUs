app.controller( 'btlCtrl1', function($scope, $stateParams, $location, authFactory, btlFactory){
  $scope.user = authFactory.currentUser;
  console.log("state param is: ", $stateParams.id);

  $scope.updateUnmatched = function() {
    btlFactory.getBattles('unmatched').then(function(result){
      $scope.allUnmatched = result;
    }, function(error){
      throw (error);
    }); // promise callbacks
  } //update ongoing battles

  $scope.updateOngoing = function() {
    btlFactory.getBattles('ongoing').then(function(result){
      $scope.allOngoing = result;
    }, function(error){
      throw (error);
    }); // promise callbacks
  } //update ongoing battles

  $scope.updateRecords = function() {
    btlFactory.getAllRecords().then(function(result){
      $scope.allRecords = result;
    }, function(error){
      throw (error);
    }); // promise callbacks
  } //update ongoing battles



if ($stateParams.id) {
  btlFactory.getUnmatched($stateParams.id).then(function(result){
    $scope.featuredVid = result;
      $scope.thumb = $scope.getThumb(result.video, 'small');
    console.log("this is the featured vid ", $scope.featuredVid);
  }, function(error){
    throw error;
  });
}



  // if (!$stateParams.urlParam) {
  //   console.log("hellos");
  //   btlFactory.getUnmatched($stateParams.id)
  //     .then(function(btl) {
  //       $scope.btl = btl;
  //     })
  // } else {
  //   console.log("hello");
  //   // which beer are we reviewing now? The following one:
  //   $scope.btl = $stateParams.urlParam; // which we got by clicking on the Review link we created
  // }


     /*$scope.getUnjoined = function() {
    }; //get all unjoined battles from server. also: //unjoinedUpdate
    $scope.getOngoing = function(){
    }; // get all ongoing battles. MIGHT RELOCATE
    $scope.addOngoing = function(){
    }; // add a new ongoing battle. delete corresponding unjoined instance NOTE: will we even need these? */
    $scope.addBattle = function() {
      var user = authFactory.getCurrentUser().then(function(user){
        console.log("user from inside btlctrl: ", user);
        var btlObj = {
          state: "unmatched",
          weight: 1,
          battleName: $scope.bName,
          voteGoal: $scope.numVotes,
          user1: user._id,
          video1: $scope.videourl,
          video1Votes: 0,
          user2: "",
          video2: "",
          video2Votes:0,
          date: "",
          winner: ""
        }
        //console.log("number of votes: " + umObj.numVotes);
        btlFactory.addBattle(bltObj).then(function(){
          $scope.updateUnmatched();
          alert("successfully opened a new battle!!");
          $location.path('/unmatched');
        });


      }); // NOTE: we want to know who's the user exactly when the button was clicked

      //create a new unmatched battle object to push
    }; //add a new unjoined battle to the collection and update

    $scope.foundMatch = function(battle) {
      var user = authFactory.getCurrentUser().then(function(user){
      //  authFactory.addOngoing();
       battle.user2 = user._id;
       battle.video2 = $scope.videourl;
       battle.state = "ongoing";
       btlFactory.updateBattle(battle).then(function(){//  result unmatched just as an id?
           $scope.updateUnmatched();
           // NOTE maybe add more functionality here?
         }); // deleting callback
         alert("added ongoing battle. ");
         $scope.updateOngoing();
         $location.path('/ongoing');
       });// add ongoing callback
     } // getCurrentUser callback  NOTE: TRANSITION: UNMATCHED==> ONGOING BATTLE
   $scope.voted = function (battle, numVideo) {
     var user = authFactory.getCurrentUser().then(function(user){
       if (numVideo===1) {
        battle.video1Votes++;
        battle.video1Voters.push(user._id);
       } else {
        battle.video2Votes++;
        battle.video2Voters.push(user._id);
       }//else
       btlFactory.updateVotes(battle).then(function(result){
         if ((battle.video1Votes === battle.voteGoal)||(battle.video2Votes===battle.voteGoal)) { //wanna say >= but that SHOULDNT happen
           $scope.finishBattle(battle);
         } else {
           //display result progress bars and related videos. which Im not sure how to tackle
         }// else voting commented but no winner yet
       }, function(error){
         throw error;
       }) //update callback
     }//get current user callback
   }// voted function

   $scope.finishBattle = function(battle, userId){
     battle.date = new Date();
     battle.winner = userId;
     battle.state = "completed";
     //$location.path('/home'); // to be added: winner screen!!
     }; //finishBattle NOTE: TRANSITION: ONGOING BATTLE ===> RECORD

    $scope.getVidId = function(){
    $scope.videourl = $scope.vidtext;
    console.log("url is", $scope.videourl);
    var videoid = $scope.videourl.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    if(videoid != null) {
      console.log("video id = ",videoid[1]);
      $scope.vidid = videoid[1];
    } else {
      console.log(videoid);
      alert("The youtube url is not valid.");
    }// else
  } //getVidId



  // $scope.updateUnmatced(); //NOTE: should run on start- up. maybe put on a different place
  // $scope.updateOngoing();
});
