'use strict';
var canvas = document.getElementById('canvas');

var bg = new Image();
var player = new Image();

bg.onload = drawCanvas;
player.onload = drawCanvas;

bg.src = 'img/sky.jpg';
player.src = 'img/ufo02.gif';

var playerPosX = canvas.width / 2 - 120 / 2;
var playerPosY = canvas.height - 100;

function drawCanvas() {
  var context = canvas.getContext('2d');

  context.drawImage(bg, 10, 10);
  context.drawImage(player, playerPosX, playerPosY, 120, 100);
}

requestAnimationFrame(tick);

var playerH = {
  posX: playerPosX,
  posY: playerPosY,
  speedX: 0,
  speedY: 0,
  height: 100,
  width: 100,
  update: function () {
    var playerObj = player;
    playerObj.style.left = this.posX + 'px';
    playerObj.style.top = this.posY + 'px';
  }
};

playerH.update();

// Функции обработчиков событий (упраление клавиатурой)
window.addEventListener('keydown', function (EO) {
  EO = EO || window.event;
  EO.preventDefault();

  if (EO.keyCode === 40) {
    playerH.speedY = 15;
  }

  if (EO.keyCode === 38) {
    playerH.speedY = -15;
  }
  if (EO.keyCode === 39) {
    playerH.speedX = 15;
  }

  if (EO.keyCode === 37) {
    playerH.speedX = -15;
  }
});

window.addEventListener('keyup', function (EO) {
  EO = EO || window.event;
  EO.preventDefault();

  if (EO.keyCode === 40) {
    playerH.speedY = 0;
  }

  if (EO.keyCode === 38) {
    playerH.speedY = 0;
  }
  if (EO.keyCode === 39) {
    playerH.speedX = 0;
  }

  if (EO.keyCode === 37) {
    playerH.speedX = 0;
  }
});
