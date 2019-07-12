'use strict';
window.onhashchange = SwitchToStateFromURLHash;

function SwitchToStateFromURLHash() {
  const hash = window.location.hash;
  let state = decodeURIComponent(hash.substr(1));

  if (state === '') {
    state = {page: 'main'};
  } else {
    state = JSON.parse(state);
  }

  let pageHTML = '';

  switch (state.page) {
    case 'main':
      pageHTML += '<div id="main-page">';
      pageHTML += '</div>';
      break;
    case 'game':
      pageHTML += '<div id="new-game">';
      pageHTML += '<canvas id="canvas"></canvas>';
      // pageHTML += '<audio src="audio/points.mp3" class="audio"></audio>';
      pageHTML += '</div>';
      startGame();
      break;
    case 'rules':
      pageHTML += '<div id="rules-game">';
      pageHTML += '<h1 class="title">Правила игры</h1>';
      pageHTML += '<h3>Помогите нашему крошечному пришельцу собрать как можно больше энергетических кексов, избегая при этом препятствий на пути.</h3>';
      pageHTML += '<ul class="list">';
      pageHTML += ' <li>Управляйте НЛО кнопками "влево", "вправо", "вверх" и "вниз"</li>';
      pageHTML += '<li>Избегайте метеоритов</li>';
      pageHTML += '<li>Собирайте кексы и получайте за это очки</li>';
      pageHTML += '</ul>';
      pageHTML += '</div>';
      break;
    case 'records':
      pageHTML += '<div id="records-page">';
      pageHTML += '<h1 id="game-title">Рекорды</h1>';
      pageHTML += '<table>';
      pageHTML += '<tr class="table-cell"><th class="table-cell">Имя игрока</th><th class="table-cell">Счет</th></tr>';
      for (var i = 0; i < lastRecords.length; i++) {
        pageHTML += `<tr class="table-cell"><td class="table-cell" id="player">${lastRecords[i].name}</td><td class="table-cell" id="score">${lastRecords[i].score}</td></tr>`;
      }
      pageHTML += '</table>';
      pageHTML += '</div>';
      break;
    case 'about':
      pageHTML += '<div id="about-page">';
      pageHTML += '<h1 id="game-title">О проекте</h1>';
      pageHTML += '</div>';
      break;
  }
  document.getElementById('pageHTML').innerHTML = pageHTML;
}

function switchToState(state) {
  location.hash = encodeURIComponent(JSON.stringify(state));
}

function switchToMainPage() {
  switchToState({page: 'main'});
}

function switchToGamePage() {
  switchToState({page: 'game'});
}

function switchToRulesPage() {
  switchToState({page: 'rules'});
}

function switchToRecordsPage() {
  switchToState({page: 'records'});
}

function switchToAboutProjectPage() {
  switchToState({page: 'about'});
}

SwitchToStateFromURLHash();