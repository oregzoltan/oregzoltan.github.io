'use strict';
var ZoltanOregApp = angular.module('ZoltanOregApp', ['ngRoute']);

ZoltanOregApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'own-cv/greenfox_CV_zoltan_oreg.htm',
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'contactController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);
