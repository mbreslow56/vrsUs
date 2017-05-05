app.controller('authCtrl', function($scope, authFactory, $state) {
  $scope.username = authFactory.currentUser.username;
  $scope.join = function() {
    $scope.user.artistWins = 0;
    $scope.user.voterWins = 0;
    authFactory.join($scope.user)
      .then(function() {
        $state.go('home');
      }, function(err) {
        alert(err.data.message);
      });
  }
  $scope.login = function() {
    authFactory.login($scope.user)
      .then(function() {
        $state.go('home');
      }, function(err) {
        alert(err.data);
      });
  }
  $scope.logout = function() {
    console.log("logging out");
    authFactory.logout($scope.user)
      .then(function() {
        console.log("logged out");
        $state.go('home', {}, {reload: true});
      }, function(err) {
        alert(err.data);
      });
  }
});

// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '671277003082097',
//       xfbml      : true,
//       version    : 'v2.9'
//     });
//     FB.AppEvents.logPageView();
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "//connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>
//
// secret: 3587b03e9bd14c9b0b4ca0f373904dd3
