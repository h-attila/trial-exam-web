const responseTextErr = {
  status: 'error',
  text: 'Error: only alphabetic characters and space allowed!',
};

var responseOk = {
  status: 'ok',
  text: '',
};

var characters = 'abcdefghijklmnopqrstuvwxyz';
var newCharPos;

module.exports = {

  // valid input checking for key
  inputKeyChecker: function (key) {
    var result = false;
    if ((key >= -25) && (key <= 25)) {
      result = true;
    }
    return result;
  },

  inputTextDecoder: function (text, key) {
    var decodedText = '';
    for (var i = 0; i < text.length; i += 1) {
      var actualCharacterPos = characters.indexOf(text[i].toLowerCase());
      var shift = parseInt(key, 10);

      if (text[i] !== ' ') {
        if (actualCharacterPos === -1) {
          console.log('Error!');
          return responseTextErr;
        }
        if ((actualCharacterPos + shift) < 0) {
          newCharPos = actualCharacterPos + shift + characters.length;
          if (text[i] === text[i].toUpperCase()) {
            decodedText += characters[newCharPos].toUpperCase();
          } else {
            decodedText += characters[newCharPos];
          }
        } else if ((actualCharacterPos + shift) >= characters.length) {
          newCharPos = actualCharacterPos + shift - characters.length;
          if (text[i] === text[i].toUpperCase()) {
            decodedText += characters[newCharPos].toUpperCase();
          } else {
            decodedText += characters[newCharPos];
          }
        } else {
          newCharPos = actualCharacterPos + shift;
          if (text[i] === text[i].toUpperCase()) {
            decodedText += characters[newCharPos].toUpperCase();
          } else {
            decodedText += characters[newCharPos];
          }
        }
      } else {
        decodedText += ' ';
      }
    }
    responseOk.text = decodedText;
    return responseOk;
  },
};
