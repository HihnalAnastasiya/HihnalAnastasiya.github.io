'use strict';
let score = 0;
let isPlaying;
let playerResult = {}; // {name: userName, score: userScore}
let canvas;
let context;
let gameFilde;
let player;
let cake;
let cake2;
let cake3;
let meteorits;

// находим элементы DOM
let audio = document.querySelector('audio');
let startButton = document.getElementById('game');
let buttonContinueGame = document.getElementById('continue-game');
let blockUserNameInput = document.getElementById('block-save-result');


// устанавливаем слушателей
startButton.addEventListener('click', startGame, false);
buttonContinueGame.addEventListener('click', startGame, false);

// Игровая среда CANVAS и её размеры
canvas = document.getElementById('canvas');
context = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

// предзагрузка изображений
let preloadedImagesH = {};

function preloadImage(img) {
  // если такое изображение уже предзагружалось - ничего не делаем
  if (img in preloadedImagesH) {
    return;
  }
  // предзагружаем - создаём невидимое изображение
  let Img = new Image();
  Img.src = img;
  // запоминаем, что изображение уже предзагружалось
  preloadedImagesH[img] = true;
}

preloadImage('img/bg011.jpg');
preloadImage('img/ufo02.gif');
preloadImage('img/cakes/cake01.png');
preloadImage('img/cakes/cake02.png');
preloadImage('img/cakes/cake03.png');
preloadImage('img/meteor.png');

// свойства и методы игрового поля
gameFilde = {
  positionX: 0,
  positionY: 0,
  width: canvas.width,
  height: canvas.height,
  draw: function () {
    let bg = new Image();
    bg.src = 'img/bg011.jpg';
    context.drawImage(bg, this.positionX, this.positionY, this.width, this.height);
    drawScore();
    if (!isPlaying) {
      drawGameOver();
    }
  }
};

// свойства и методы игрока
player = {
  width: 90,
  height: 65,
  speedX: 0,
  speedY: 0,
  positionX: 400 - this.width / 2,
  positionY: 300,
  draw: function () {
    let img = new Image();
    img.src = 'img/ufo02.gif';
    context.drawImage(img, this.positionX, this.positionY, this.width, this.height);
  },
  update: function () {
    if (isPlaying) {
      this.positionX += this.speedX;
      this.positionY += this.speedY;
      if (this.positionY + this.height > canvas.height) {
        this.positionY = canvas.height - this.height;
      }
      if (this.positionY < 0) {
        this.positionY = 0;
      }
      if (this.positionX + this.width > canvas.width) {
        this.positionX = canvas.width - this.width;
      }
      if (this.positionX < 0) {
        this.positionX = 0;
      }
    }
  }
};

// свойства и методы бонусных кексов
cake = {
  width: 40,
  height: 40,
  speedY: 3,
  positionX: Math.random() * (canvas.width - this.width),
  positionY: -40,
  draw: function () {
    let imgCake = new Image();
    imgCake.src = 'img/cakes/cake01.png';
    context.drawImage(imgCake, this.positionX, this.positionY, this.width, this.height);
  },
  update: function () {
    if (isPlaying) {
      this.positionY += this.speedY;
      if (this.positionY + this.height > canvas.height) {
        this.positionY = 0;
        this.positionX = Math.random() * (canvas.width - this.width);
      }
      if (this.positionY < 0) {
        this.positionY = 0;
      }
    }
  }
};

cake2 = {
  width: 35,
  height: 35,
  speedY: 4,
  positionX: Math.random() * (canvas.width - this.width),
  positionY: -40,
  draw: function () {
    let imgCake2 = new Image();
    imgCake2.src = 'img/cakes/cake02.png';
    context.drawImage(imgCake2, this.positionX, this.positionY, this.width, this.height);
  },
  update: function () {
    if (isPlaying) {
      this.positionY += this.speedY;
      if (this.positionY + this.height > canvas.height) {
        this.positionY = 0;
        this.positionX = Math.random() * (canvas.width - this.width);
      }
      if (this.positionY < 0) {
        this.positionY = 0;
      }
    }
  }
};

cake3 = {
  width: 45,
  height: 45,
  speedY: 2,
  positionX: Math.random() * (canvas.width - this.width),
  positionY: -45,
  draw: function () {
    let imgCake2 = new Image();
    imgCake2.src = 'img/cakes/cake03.png';
    context.drawImage(imgCake2, this.positionX, this.positionY, this.width, this.height);
  },
  update: function () {
    if (isPlaying) {
      this.positionY += this.speedY;
      if (this.positionY + this.height > canvas.height) {
        this.positionY = 0;
        this.positionX = Math.random() * (canvas.width - this.width);
      }
      if (this.positionY < 0) {
        this.positionY = 0;
      }
    }
  }
};

// свойства и методы метеоритов-препятствий
meteorits = {
  width: 80,
  height: 80,
  speedY: 3,
  positionX: Math.random() * (canvas.width - this.width),
  positionY: -80,
  draw: function () {
    let imgMeteor = new Image();
    imgMeteor.src = 'img/meteor.png';
    context.drawImage(imgMeteor, this.positionX, this.positionY, this.width, this.height);
  },
  update: function () {
    if (isPlaying) {
      this.positionY += this.speedY;
      if (this.positionY + this.height > canvas.height) {
        this.positionY = 0;
        this.positionX = Math.random() * (canvas.width - this.width);
      }
      if (this.positionY < 0) {
        this.positionY = 0;
      }
      collisionsCheck();
    }
  }
};

// управление игроком с клавиатуры
window.addEventListener('keydown', function (EO) {
  EO = EO || window.event;
  // EO.preventDefault();

  if (EO.keyCode === 40) {
    player.speedY = 10;
  }

  if (EO.keyCode === 38) {
    player.speedY = -10;
  }
  if (EO.keyCode === 39) {
    player.speedX  = 10;
  }

  if (EO.keyCode === 37) {
    player.speedX  = -10;
  }
});

window.addEventListener('keyup', function (EO) {
  EO = EO || window.event;
  // EO.preventDefault();

  if (EO.keyCode === 40) {
    player.speedY = 0;
  }

  if (EO.keyCode === 38) {
    player.speedY = 0;
  }
  if (EO.keyCode === 39) {
    player.speedX  = 0;
  }

  if (EO.keyCode === 37) {
    player.speedX  = 0;
  }
});

// Функция старта игры
function startGame() {
  isPlaying = true;
  score = 0;
  player.positionX = 400 - player.width / 2;
  player.positionY = 300;
  cake.positionX = Math.random() * (canvas.width - cake.width);
  cake.positionY = 0;
  cake2.positionX = Math.random() * (canvas.width - cake2.width);
  cake2.positionY = 0;
  cake3.positionX = Math.random() * (canvas.width - cake3.width);
  cake3.positionY = 0;
  meteorits.positionX = Math.random() * (canvas.width - meteorits.width);
  meteorits.positionY = 0;
  showBlockGameOver();
}

// функция окончания игры
function gameOver() {
  isPlaying = false;
  drawGameOver();
  showBlockGameOver();
}

function showBlockGameOver() {
  if (!isPlaying ) {
    blockUserNameInput.style.display = 'block';
    let userName = document.getElementById('user-name').value;
    let userScore = score;
    playerResult.name = userName || 'player';
    playerResult.score = userScore;
    // sendResult();
  } else {
    blockUserNameInput.style.display = 'none';
  }
}

// функция отрисовки счета игры
function drawScore() {
  context.save();
  context.font = '18px Arial';
  context.fillStyle = '#00afff';
  context.fillText('Score: ' + score, 8, 20);
  context.restore();
}

// функция отрисовки окончания игры
function drawGameOver() {
  context.save();
  context.font = '60px Arial';
  context.fillStyle = 'white';
  context.fillText('Game over', 250, 100);
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.restore();
}

// общая функция для расчета столкновений
function collisions(a, b) {
  return a.positionX < b.positionX + b.width - 10 &&
    a.positionX + a.width - 10 > b.positionX &&
    a.positionY < b.positionY + b.height - 10 &&
    a.positionY + a.height - 10 > b.positionY;
}

// функция проверки столкновений с метеоритами-препятствиями и бонусными кексами
function collisionsCheck() {
  if (collisions(meteorits, player)) {
    gameOver();
  }
  if (collisions(cake, player)) {
    score += 10;
    audio.play();
    cake.positionY = 0;
    cake.positionX = Math.random() * (canvas.width - cake.width);
  }
  if (collisions(cake2, player)) {
    score += 10;
    audio.play();
    cake2.positionY = 0;
    cake2.positionX = Math.random() * (canvas.width - cake2.width);
  }
  if (collisions(cake3, player)) {
    score += 10;
    audio.play();
    cake3.positionY = 0;
    cake3.positionX = Math.random() * (canvas.width - cake3.width);
  }
}

// отрисовка объектов на канвасе
function draw() {
  gameFilde.draw();
  player.draw();
  cake.draw();
  cake2.draw();
  cake3.draw();
  meteorits.draw();
}

// обновление сущностей
function update() {
  player.update();
  cake.update();
  cake2.update();
  cake3.update();
  meteorits.update();
}

// цикл, постоянно отрисовывающий и обнавляющий игру
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
