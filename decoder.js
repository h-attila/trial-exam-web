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

  // text checker and modifier
  inputTextDecoder: function (text, key) {
    var decodedText = '';
    for (var i = 0; i < text.length; i += 1) {
      var actualCharacterPos = characters.indexOf(text[i].toLowerCase());
      var shift = parseInt(key, 10);

      // cheching gor space
      if (text[i] !== ' ') {
        if (actualCharacterPos === -1) {
          console.log('Error!');
          return responseTextErr;
        }

        // if we left the character list from left (eg. a->z)
        if ((actualCharacterPos + shift) < 0) {
          newCharPos = actualCharacterPos + shift + characters.length;
          if (text[i] === text[i].toUpperCase()) {
            decodedText += characters[newCharPos].toUpperCase();
          } else {
            decodedText += characters[newCharPos];
          }

          // if we left the character list from right (eg. z->a)
        } else if ((actualCharacterPos + shift) >= characters.length) {
          newCharPos = actualCharacterPos + shift - characters.length;
          if (text[i] === text[i].toUpperCase()) {
            decodedText += characters[newCharPos].toUpperCase();
          } else {
            decodedText += characters[newCharPos];
          }
        } else {

          // we are inside the character list
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
