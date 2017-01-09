var server = require('express');
var bodyParser = require('body-parser');
var app = server();

const responseErr = {
  status: 'error',
  text: 'Shift is out of bound',
};

var responseOk = {
  status: 'ok',
  text: '',
};

// set static content
app.use('/', server.static('web'));
app.use(bodyParser.json());

// Ger data to decrypt from frontend
app.post('/decode', function (req, res) {
  var text = req.body.text;
  var key = parseInt(req.body.key, 10);
  if (checkerAndEncrypter.key(key)) {
    res.status(200).json(checkerAndEncrypter.text(text, key));
  } else {
    res.status(400).json(responseErr);
  }
});

app.get('//decode/all', function (req, res) {
  // if (checkerAndEncrypter.key(key)) {
  //   res.status(200).json(checkerAndEncrypter.text(text, key));
  // } else {
  //   res.status(400).json(responseErr);
  // }
});


var checkerAndEncrypter = (function () {

  var characters = 'abcdefghijklmnopqrstuvwxyz';
  var newCharPos;

  // valid input checking for key
  function inputKeyChecker(key) {
    if ((key >= -25) && (key <= 25)) {
      return true;
    }
    return false;
  }

  function inputTextEncrypter(text, key) {
    var encryptedText = '';
    for (var i = 0; i < text.length; i += 1) {
      var actualCharacterPos = characters.indexOf(text[i].toLowerCase());
      var shift = parseInt(key, 10);

      if (text[i] !== ' ') {
        if (actualCharacterPos === -1) {
          console.log('Error!');
          return responseErr;
        }
        if ((actualCharacterPos + shift) < 0) {
          newCharPos = actualCharacterPos + shift + characters.length;
          if (text[i] === text[i].toUpperCase()) {
            encryptedText += characters[newCharPos].toUpperCase();
          } else {
            encryptedText += characters[newCharPos];
          }
        } else if ((actualCharacterPos + shift) >= characters.length) {
          newCharPos = actualCharacterPos + shift - characters.length;
          if (text[i] === text[i].toUpperCase()) {
            encryptedText += characters[newCharPos].toUpperCase();
          } else {
            encryptedText += characters[newCharPos];
          }
        } else {
          newCharPos = actualCharacterPos + shift;
          if (text[i] === text[i].toUpperCase()) {
            encryptedText += characters[newCharPos].toUpperCase();
          } else {
            encryptedText += characters[newCharPos];
          }
        }
      } else {
        encryptedText += ' ';
      }
    }
    responseOk.text = encryptedText;
    return responseOk;
  }

  return {
    // public functions
    key: inputKeyChecker,
    text: inputTextEncrypter,
  };

})();


// START SERVER
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server running on port %d', port);
});
