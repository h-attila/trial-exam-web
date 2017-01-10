// AJAX communication with server
var ajax = (function () {

  // Send data to decode to the server
  function sendDataToDecode(text, key) {
    var data = { text: text, key: key };
    talkToServer('POST', '/decode', data, getAllDecodedData);
  }

  // Gt all data from server
  function getAllDecodedData() {
    talkToServer('GET', '/decode/all', null, app.showResults);
  }

  // Setting up server communication
  function talkToServer(method, additionalUrl, data, callbackFunc) {
    var url = 'http://localhost:3000' + additionalUrl;
    var httpRequest = new XMLHttpRequest();
    httpRequest.open(method, url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

    // if data exist
    data ? httpRequest.send(JSON.stringify(data)) : httpRequest.send();

    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        var response = JSON.parse(httpRequest.response);
        if (response.status === 'error') {
          app.dataError(response.text);
        }
        console.log(response);
        callbackFunc(response);
      }
    };
  }
  return {

    // public functions
    sendDataToDecode: sendDataToDecode,
    getAllDecodedData: getAllDecodedData,

  };
})();

// Main app
var app = (function () {

  // HTML front-side elements
  var button = document.querySelector('.button');
  var inputText = document.querySelector('.input-text');
  var decodeKey = document.querySelector('.decode-key');
  var list = document.querySelector('.list');

  // Events handling
  button.addEventListener('click', function () {
    ajax.sendDataToDecode(inputText.value, decodeKey.value);
  });

  // generate the list for the data comes from server
  function showResults(dataFromWeb) {
    list.innerHTML = '';
    dataFromWeb.forEach(function (item) {
      var listItem = document.createElement('li');
      listItem.innerHTML = item.text;
      console.log(listItem.innerHTML);
      list.appendChild(listItem);
    });
  }

  // send error msg using vex
  function dataError(errorMsg) {
    vex.dialog.alert(errorMsg);
  }

  return {
    // public functions
    dataError: dataError,
    showResults: showResults,
  };

})();


app();
