'use strict';
var ZoltanOregApp = angular.module('ZoltanOregApp', []);

ZoltanOregApp.controller('mainController', ['$scope', '$http', '$log', function($scope, $http, $log) {
  $scope.resultMessage;
  $scope.formData;
  $scope.submitButtonDisabled = false;
  $scope.submitted = false;
  $scope.submit = function() {
    $scope.submitted = true;
    $scope.submitButtonDisabled = true;
    emailjs.send("gmail", "template1",{name: $scope.formData.inputName, email: $scope.formData.inputEmail, subject: $scope.formData.inputSubject, message: $scope.formData.inputMessage})
      .then(function(response) {
        console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        $scope.submitButtonDisabled = true;
        $scope.resultMessage = 'Thank you! I have received your message.';
        $scope.$applyAsync();
        $scope.result='bg-success';
      }, function(err) {
        console.log("FAILED. error=", err);
        $scope.submitButtonDisabled = false;
        $scope.resultMessage = 'Message could not be sent. Mailer Error: ' + err.status;
        $scope.$applyAsync();
        $scope.result='bg-danger';
      });
    $scope.resultMessage = 'Sending...';
    $scope.result='bg-info';
  }
}]);
