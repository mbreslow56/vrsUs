var app = angular.module("appName", ['ui.router', 'youtube-embed']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: function($rootScope, authFactory) {
        $rootScope.currentUser = authFactory.currentUser.username;
        //console.log("user from state of home is: ", authFactory.currentUser.username);
      } //NOTE: maybe remove for authControl?
    })
    .state('battle', {
      url: '/battle',
      templateUrl: '/templates/battle.html',
      controller: 'myCtrl'
    })
    .state('unmatched', {
      url: '/unmatched',
      templateUrl: '/templates/unmatchedBattles.html',
      controller: 'unmatchedCtrl'
    })
    .state('challenge', {
      url: '/challenge/:id',
      templateUrl: '/templates/joinUnmatched.html',
      controller: 'btlCtrl1',
      params: {
        urlParam: null
      }
    })
    .state('ongoing', {
      url: '/ongoing',
      templateUrl: '/templates/ongoingBattles.html',
      controller: 'ongoingCtrl'
    })
    .state('create', {
      url: '/create',
      templateUrl: '/templates/createBattle.html',
      controller: 'btlCtrl1'
    })
    .state('join', {
      url: '/join',
      templateUrl: '/templates/join.html',
      controller: 'authCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'authCtrl'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: '/templates/home.html',
      controller: 'authCtrl'
    })
    .state('completed', {
      url: '/completed',
      templateUrl: '/templates/completedBattles.html',
      controller: 'completeCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: '/templates/about.html',
      controller: 'authCtrl'
    })
    .state('howto', {
      url: '/howto',
      templateUrl: '/templates/howto.html',
      controller: 'authCtrl'
    })
    .state('winner', {
      url: '/winner',
      templateUrl: '/templates/winner.html',
      controller: 'winnerCtrl',
      params: {
        winner: null
      }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: '/templates/profile.html',
      controller: 'profileCtrl'
    })

});
