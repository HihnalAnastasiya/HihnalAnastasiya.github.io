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
