'use strict';
let lastRecords = [];
let UpdatePassword;
const stringName = 'KHIKHNAL_SPACE_CAKES_RECORDS';
const ajaxHandlerScript = 'http://fe.it-academy.by/AjaxStringStorage2.php';
let buttonSendResult = document.getElementById('save-result');
buttonSendResult.addEventListener('click',  sendResult, false);

function refreshRecords() {
  $.ajax(
    {
      url: ajaxHandlerScript,
      type: 'POST',
      data: {f: 'READ', n: stringName},
      cache: false,
      success: ReadReady,
      error: ErrorHandler
    }
  );
}

function ReadReady(resultData) {
  if (resultData.error !== undefined)
    alert(resultData.error);
  else {
    lastRecords = [];
    if (resultData.result !== '') {
      lastRecords = JSON.parse(resultData.result);
      if (!lastRecords.length)
        lastRecords = [];
    }
  }
}

function sendResult() {
  UpdatePassword = Math.random();
  $.ajax(
    {
      url: ajaxHandlerScript,
      type: 'POST',
      data: {
        f: 'LOCKGET', n: stringName,
        p: UpdatePassword
      },
      cache: false,
      success: LockGetReady,
      error: ErrorHandler
    }
  );
}

function LockGetReady(resultData) {
  if (resultData.error !== undefined)
    alert(resultData.error);
  else {
    lastRecords = [];
    if (resultData.result !== '') {
      lastRecords = JSON.parse(resultData.result);
      if (!lastRecords.length)
        lastRecords = [];
    }

    let playerName = playerResult.name || 'player';
    let playerScore = playerResult.score || 0;
    lastRecords.push({name: playerName, score: playerScore});
    if (lastRecords.length > 10)
      lastRecords = lastRecords.slice(lastRecords.length - 10);

    $.ajax(
      {
        url: ajaxHandlerScript,
        type: 'POST',
        data: {
          f: 'UPDATE', n: stringName,
          v: JSON.stringify(lastRecords), p: UpdatePassword
        },
        cache: false,
        success: UpdateReady,
        error: ErrorHandler
      }
    );
  }
}

function UpdateReady(resultData) {
  if (resultData.error !== undefined)
    alert(resultData.error);
}

function ErrorHandler(jqXHR, StatusStr, ErrorStr) {
  console.log(StatusStr + ' ' + ErrorStr);
}

refreshRecords();