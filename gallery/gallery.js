'use strict';

var pictureList = [
  'imgs/01.png',
  'imgs/6095.jpg',
  'imgs/02.png',
  'imgs/6096.jpg',
  'imgs/03.png',
  'imgs/6098.jpg',
  'imgs/04.png',
  'imgs/6099.jpg',
  'imgs/05.png',
  'imgs/6100.jpg',
  'imgs/06.png',
  'imgs/6101.jpg',
  'imgs/07.png',
  'imgs/6109.jpg',
  'imgs/08.png',
  'imgs/6111.jpg',
  'imgs/09.png',
  'imgs/6112.jpg',
  'imgs/6115.jpg',
  'imgs/6116.jpg',
  'imgs/6117.jpg',
  'imgs/10.jpg',
];

var counter = 0;
var actual = 0;
var actualSmall = 0;
var limit = 0;

var img_main = document.querySelector('.img_big');
setMainImg();

var img_row = document.querySelectorAll('.img_small');
setSmallImgs();

function setImageTitle() {
  return img_title.textContent = img_main.getAttribute('src').split('/')[1];
}

function setMainImg() {
  img_main.setAttribute('src', pictureList[actual]);
}

function setSmallImgs() {
  limit = actualSmall + 4;
  counter = 0;
  for (var i = actualSmall; i < limit; i++) {
    img_row[counter].setAttribute('src', pictureList[i]);
    counter++;
  }
}

var img_title = document.querySelector('h2');
setImageTitle();

var buttonBL = document.querySelector('.big_left');
var buttonSL = document.querySelector('.small_left');
var buttonBR = document.querySelector('.big_right');
var buttonSR = document.querySelector('.small_right');

function bigToRight() {
  if (actual < pictureList.length - 1) {
    actual++;
    setMainImg();
    setImageTitle();
  }
}

function bigToLeft() {
  if (actual > 0) {
    actual--;
    setMainImg();
    setImageTitle();
  }
}

function smallToRight() {
  if (actualSmall + 4 < pictureList.length) {
    actualSmall++;
    setSmallImgs();
  }
}

function smallToLeft() {
  if (actualSmall > 0) {
    actualSmall--;
    setSmallImgs();
  }
}

function clickSmallImg(i) {
  return function() {
    img_main.setAttribute('src', img_row[i].getAttribute('src'));
    setImageTitle();
    pictureList.forEach(function(e, j) {
      if (e === img_row[i].getAttribute('src')) {
        actual = j;
      }
    })
  };
}

buttonBL.addEventListener('click', bigToLeft);
buttonSL.addEventListener('click', smallToLeft);
buttonBR.addEventListener('click', bigToRight);
buttonSR.addEventListener('click', smallToRight);
for (var i = 0; i < 4; i++) {
  img_row[i].addEventListener('click', clickSmallImg(i));
}
