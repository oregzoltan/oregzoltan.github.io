'use strict';
var myBlackSwanApp = angular.module('blackSwanApp', ['ngRoute', 'LocalStorageModule']);

myBlackSwanApp.config(['$routeProvider', 'localStorageServiceProvider', function($routeProvider, localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('myBlackSwanApp');
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'blackSwanController'
    })
    .when('/highscores', {
      templateUrl: 'views/highscores.html',
      controller: 'blackSwanController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);
