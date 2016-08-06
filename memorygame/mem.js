'use strict';
var time = 120;
var score = 0;
var level = 1;
var actual = {id: -1, src:''};
var pictureList = [];
var pictures = [];

function init(w) {
  pictures = [
    'imgs'+w+'/01.JPG', 'imgs'+w+'/02.JPG', 'imgs'+w+'/03.JPG', 'imgs'+w+'/04.JPG', 'imgs'+w+'/05.JPG',
    'imgs'+w+'/06.JPG', 'imgs'+w+'/07.JPG', 'imgs'+w+'/08.JPG', 'imgs'+w+'/09.JPG', 'imgs'+w+'/10.JPG',
    'imgs'+w+'/11.JPG', 'imgs'+w+'/12.JPG', 'imgs'+w+'/13.JPG', 'imgs'+w+'/14.JPG', 'imgs'+w+'/15.JPG',
    'imgs'+w+'/16.JPG', 'imgs'+w+'/17.JPG', 'imgs'+w+'/18.JPG', 'imgs'+w+'/19.JPG', 'imgs'+w+'/20.JPG',
    'imgs'+w+'/21.JPG', 'imgs'+w+'/22.JPG', 'imgs'+w+'/23.JPG', 'imgs'+w+'/24.JPG', 'imgs'+w+'/25.JPG',
    'imgs'+w+'/26.JPG', 'imgs'+w+'/27.JPG', 'imgs'+w+'/28.JPG', 'imgs'+w+'/29.JPG', 'imgs'+w+'/30.JPG'
  ];
}

init(1);

var image1 = document.createElement('img');
image1.setAttribute('src', 'menu/01.JPG');
image1.addEventListener('click', whichOne);
var image2 = document.createElement('img');
image2.setAttribute('src', 'menu/02.JPG');
image2.addEventListener('click', whichOne);
var image3 = document.createElement('img');
image3.setAttribute('src', 'menu/03.JPG');
image3.addEventListener('click', whichOne);
var image4 = document.createElement('img');
image4.setAttribute('src', 'menu/04.JPG');
image4.addEventListener('click', whichOne);
var options = document.querySelector('.options');
options.appendChild(image1);
options.appendChild(image2);
options.appendChild(image3);
options.appendChild(image4);

function whichOne(event) {
  score = 0;
  level = 1;
  init(event.target.getAttribute('src').slice(6,7));
  actual = {id: -1, src:''};
  newLevel();
}

var img_row = document.querySelectorAll('.img_small');
var timeField = document.querySelector('.time');
var scoreField = document.querySelector('.score');
var levelField = document.querySelector('.level');

function shuffle(array) {
  var count = array.length,
     randomnumber,
     temp;
  while(count) {
  randomnumber = Math.random() * count-- | 0;
  temp = array[count];
  array[count] = array[randomnumber];
  array[randomnumber] = temp
  }
  return array;
}

function getNewPictureList() {
  pictureList = shuffle(pictures).slice(0,12);
  pictureList = shuffle(pictureList.concat(pictureList));
}

function addEListeners() {
  for (var i = 0; i < 24; i++) {
    img_row[i].addEventListener('click', clickSmallImg(i));
  }
}

function setSmallImgs() {
  for (var i = 0; i < 24; i++) {
    img_row[i].setAttribute('src', pictureList[i]);
    img_row[i].classList.remove('clicked');
    img_row[i].classList.remove('done');
  }
}

function newLevel() {
  time = 180;
  actual = {id: -1, src:''};
  scoreField.textContent = 'Your score is ' + score;
  levelField.textContent = 'Level ' + level;
  var setTimer = setInterval(function () {
    time -= 1;
    timeField.textContent = 'Time left: ' + time;
    if (time <=0) {
      clearInterval(setTimer);
      alert('GAME OVER');
      score = 0;
      level = 1;
      newLevel();
    }
  }, 1000);
  getNewPictureList();
  setSmallImgs();
}

function clickSmallImg(i) {
  return function() {
    console.log(i);
    if ((actual.src === img_row[i].getAttribute('src')) && (actual.id !== i)) {
      img_row[i].classList.add('done');
      img_row[actual.id].classList.add('done');
      actual = {id: -1, src:''};
    } else if (actual.id === -1) {
      img_row[i].classList.add('clicked');
      actual.id = i;
      actual.src = img_row[i].getAttribute('src');
    } else {
      img_row[i].classList.add('clicked');
      setTimeout(function() {
        img_row[i].classList.remove('clicked');
        img_row[actual.id].classList.remove('clicked');
        actual = {id: -1, src:''};
      }, 1000);
    }

    var allDone = true;
    img_row.forEach(function (e) {
      if (!e.classList.contains('done')) {
        allDone = false;
      }
    })
    score++;
    scoreField.textContent = 'Your score is ' + score;
    if (allDone) {
      score += time*10;
      level++;
      newLevel();
    }
  };
}

newLevel();
addEListeners();
