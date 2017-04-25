var app = angular.module("appName", ['ui.router']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/home');
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'js/templates/home.html',
      controller: function($rootScope, authFactory){
        $rootScope.currentUser = authFactory.currentUser;
        console.log(authFactory.currentUser)
      } 
  })
    .state('battle', {
      url: '/battle',
      templateUrl: 'js/templates/battle.html',
      controller: function($rootScope, authFactory){
        $rootScope.currentUser = authFactory.currentUser;
        console.log(authFactory.currentUser)
      }	
  })
    .state('join', {
      url: '/join',
      templateUrl: 'js/templates/join.html',
      controller: 'authCtrl'		
  })
    .state('login', {
      url: '/login',
      templateUrl: 'js/templates/login.html',
      controller: 'authCtrl'
  })
      .state('logout', {
      url: '/logout',
      templateUrl: 'js/templates/battle.html',
      controller: 'authCtrl'
  })
});