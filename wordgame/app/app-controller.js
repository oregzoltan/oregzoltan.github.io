'use strict';
var myBlackSwanApp = angular.module('blackSwanApp');

myBlackSwanApp.controller('blackSwanController', ['$scope', 'localStorageService', function($scope, localStorageService) {
  $scope.scores = [];
  localStorageService.keys().forEach(function(e) {
    $scope.scores.push({word: e, highscore: localStorageService.get(e)});
  })

  function countUniqueLetters(word) {
    var letters = [];
    word.split('').forEach(function(e) {
      if (letters.indexOf(e) === -1) {
        letters.push(e);
      }
    })
    return letters.length;
  }

  function isWordInTheDictionary() {
    return (wordList.some(function(e) { return e === $scope.newWord; }));
  }

  $scope.checkInput = function() {
    if (isWordInTheDictionary() && (typeof localStorageService.get($scope.newWord) !== 'number')) {
      localStorageService.set($scope.newWord, countUniqueLetters($scope.newWord));
      $scope.displayComment = 'You have ' + countUniqueLetters($scope.newWord) + ' points for the word ' + $scope.newWord;
    } else if (isWordInTheDictionary()) {
      $scope.displayComment = 'You have already found the word ' + $scope.newWord;
    } else {
      $scope.displayComment = 'The word ' + $scope.newWord + ' is not in the dictionary! Please type another one!';
    }
    $scope.newWord = '';
  }
}]);
