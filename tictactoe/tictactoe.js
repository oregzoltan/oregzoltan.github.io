'use strict';
var ticTacToe = (function() {

  var images = document.querySelectorAll('.image');
  var scoreFields = document.querySelectorAll('.score');
  var result = document.querySelector('.result');
  var fields = [];
  init();

  function init() {
    addEListeners();
    if (localStorage.fields === 'undefined') {
      setLocalStorage();
    }
    updateFieldsAndImgs();
  }

  function addEListeners() {
    for (var i = 0; i < 9; i++) {
      images[i].addEventListener('click', clickImage(i));
    }
  }

  function setLocalStorage(saveResult) {
    localStorage.fields = 'b,b,b,b,b,b,b,b,b';
    if (!saveResult) {
      localStorage.scoreFieldX = '0';
      localStorage.scoreFieldO = '0';
    }
  }

  function updateFieldsAndImgs() {
    fields = localStorage.fields.split(',');
    scoreFields[0].textContent = localStorage.scoreFieldO;
    scoreFields[1].textContent = localStorage.scoreFieldX;
    setImgs();
  }

  function setImgs() {
    for (var i = 0; i < 9; i++) {
      images[i].setAttribute('src', 'imgs/' + fields[i] + '.png');
      images[i].classList.remove('clicked');
    }
  }

  function displayWinner(who, time) {
    if (who === 'draw') {
      result.textContent = 'DRAW! NEW GAME STARTS IN ' + time + ' SECONDS';
    } else {
      result.textContent = who.toUpperCase() + ' WON! NEW GAME STARTS IN ' + time + ' SECONDS';
    }
  }

  function incrementResult(who) {
    if (who === 'x') {
      localStorage.scoreFieldX = parseInt(localStorage.scoreFieldX)+1;
    }
    if (who === 'o') {
      localStorage.scoreFieldO = parseInt(localStorage.scoreFieldO)+1;
    }
  }

  function disableImgs() {
    images.forEach(function(e, i) {
      images[i].classList.add('clicked');
    });
  }

  function newGame(who) {
    var time = 5;
    disableImgs();
    displayWinner(who, time);
    var setTimer = setInterval(function () {
      time -= 1;
      displayWinner(who, time);
      if (time <=0) {
        clearInterval(setTimer);
        result.textContent = '';
        incrementResult(who);
        setLocalStorage(true);
        updateFieldsAndImgs();
      }
    }, 1000);
  }

  function checkForWinner(char) {
    return ((fields[0] === char && fields[1] === char && fields[2] === char) ||
      (fields[3] === char && fields[4] === char && fields[5] === char) ||
      (fields[6] === char && fields[7] === char && fields[8] === char) ||
      (fields[0] === char && fields[4] === char && fields[8] === char) ||
      (fields[0] === char && fields[3] === char && fields[6] === char) ||
      (fields[0] === char && fields[3] === char && fields[6] === char) ||
      (fields[1] === char && fields[4] === char && fields[7] === char) ||
      (fields[2] === char && fields[5] === char && fields[8] === char) ||
      (fields[2] === char && fields[4] === char && fields[6] === char));
  }

  function playerTurn(i) {
    images[i].setAttribute('src', 'imgs/x.png');
    images[i].classList.add('clicked');
    fields[i] = 'x';
    localStorage.fields = fields;
  }

  function computerTurn(i) {
    setTimeout(function() {
      var randomList = [];
      fields.forEach(function(e, i) {
        if (e === 'b') {
          randomList.push(i);
        }
      });
      var computerField = randomList[Math.floor(Math.random() * (randomList.length))];
      images[computerField].setAttribute('src', 'imgs/o.png');
      images[computerField].classList.add('clicked');
      fields[computerField] = 'o';
      localStorage.fields = fields;
      if (checkForWinner('o')) {
        newGame('o');
        return;
      }
    }, 300);
  }

  function clickImage(i) {
    return function() {
      playerTurn(i);
      if (checkForWinner('x')) {
        newGame('x');
        return;
      }
      computerTurn(i);
      if (fields.every(function(e) { return e !== 'b'; })) {
        newGame('draw');
      }
    };
  }

})();
