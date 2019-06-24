'use strict';
var canvas = document.getElementById('canvas');

var bg = new Image();
var player = new Image();

bg.onload = drawCanvas;
player.onload = drawCanvas;

bg.src = 'img/sky.jpg';
player.src = 'img/ufo02.gif';

var playerX = canvas.width / 2 - 100;
var playerY = canvas.height - 200;

function drawCanvas() {
  var context = canvas.getContext('2d');

  context.drawImage(bg, 10, 10);
  context.drawImage(player, playerX, playerY);
}

requestAnimationFrame(tick);

var playerH = {
  posX: playerX,
  posY: playerY,
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

function tick() {
  playerH.update();

  playerH.posX += playerH.speedX;
  playerH.posY += playerH.speedY;
  // if (playerH.posY + playerH.height > canvas.height) {
  //   playerH.posY = canvas.height -  playerH.height - 2;
  // }
  // if (playerH.posY < 0) {
  //   playerH.posY = 0;
  // }
  //

  // playerH.update();

  requestAnimationFrame(tick);
}
