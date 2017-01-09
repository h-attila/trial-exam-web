// AJAX communication with server
// start: 19:30

var ajax = (function () {

  // Send data to decrypt to the server
  function sendDataToDecrypt(text, key) {
    var data = { 'text': text, 'key': key };
    console.log(data);
    talkToServer('POST', '/decode', data, console.log);

  }

  function getAllDecryptedData() {
    var data = { 'text': text, 'key': key };
    talkToServer('GET', '/decode/all', null, console.log);
  }

  // Setting up server communication
  function talkToServer(method, additionalUrl, data, callbackFunc) {
    const url = 'http://localhost:3000' + additionalUrl;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open(method, url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    // if data exist
    data ? httpRequest.send(JSON.stringify(data)) : httpRequest.send();

    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        callbackFunc(JSON.parse(httpRequest.response));
      }
    };
  }

  return {
    sendDataToDecrypt: sendDataToDecrypt,
    getAllDecryptedData: getAllDecryptedData,

  };
})();


var app = (function () {

  var button = document.querySelector('.button');
  var buttonAll = document.querySelector('.buttonAll');
  var inputText = document.querySelector('.input-text');
  var decriptionKey = document.querySelector('.decription-key');

  button.addEventListener('click', function () {
    ajax.sendDataToDecrypt(inputText.value, decriptionKey.value);
  });

  buttonAll.addEventListener('click', function () {
    ajax.getAllDecryptedData();
  });

  function dataError(errorMsg) {
    vex.dialog.alert(errorMsg);
  }

  return {
    // public functions come here
    dataError: dataError,

  };

})();


app();
