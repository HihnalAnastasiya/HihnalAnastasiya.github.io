'use strict';
// обертка для RequestAnimationFrame
var requestAnimFrame = (function () {
  return window.requestAnimationFrame       ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    window.oRequestAnimationFrame      ||
    window.msRequestAnimationFrame     ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();


// Игровая среда CANVAS и её размеры
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
// var viewportWidth = window.innerWidth;
// var viewportHeight = window.innerHeight;
canvas.width = 800;
canvas.height = 500;

canvas.style.position = 'absolute';
canvas.style.left = 0;
canvas.style.top = 0;


// предзагруузка изображений
var preloadedImagesH = {};

function preloadImage(img) {
  // если такое изображение уже предзагружалось - ничего не делаем
  if (img in preloadedImagesH) {
    return;
  }
  // предзагружаем - создаём невидимое изображение
  var Img = new Image();
  Img.src = img;
  // запоминаем, что изображение уже предзагружалось
  preloadedImagesH[img] = true;
}

preloadImage( 'img/bg01.jpg');
preloadImage('img/ufo02.gif');
preloadImage('img/cakes/cake01.png');
preloadImage('img/cakes/cake02.png');
preloadImage('img/cakes/cake03.png');
