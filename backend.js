var server = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var checkerAndDecoder = require('./decoder.js');

// error message for key error
const responseKeyErr = {
  status: 'error',
  text: 'Shift is out of bound',
};

// set static content
var app = server();
app.use('/', server.static('web'));
app.use(bodyParser.json());

// Post data from fromt to decode, and send back
app.post('/decode', function (req, res) {
  var text = req.body.text;
  var key = parseInt(req.body.key, 10);
  if (checkerAndDecoder.inputKeyChecker(key)) {
    var decodedText = checkerAndDecoder.inputTextDecoder(text, key).text;
    database.write({ text: decodedText, decodeKey: key }, function (data) {
      res.status(200).json(data);
    });
  } else {
    res.status(400).json(responseKeyErr);
  }
});

// send all data back to frontend
app.get('/decode/all', function (req, res) {
  database.read(function (data) {
    res.status(200).json(data);
  });
});

// database handling
var database = (function () {

  // setting up database connection
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'myTopSecretNewPassword123',
    database: 'js_probavizsga',
  });

  // close db connection - not used now
  function closeDatabaseConnection() {
    connection.end(function () {
      console.log('connection closed successfully');
    });
  }

  function dataRead(callback) {
    connection.query('SELECT * FROM js_probavizsga', function (err, data) {
      if (err) throw err;
      console.log('Data from database:');
      data.forEach(function (row) {
        console.log(`id: ${row.id}, text: ${row.text}`);
      });
      callback(data);
    });
  }

  function dataWrite(data, callback) {
    connection.query('INSERT INTO js_probavizsga SET ?', data, function (err, res) {
      if (err) throw err;
      console.log(`data added successfully on ID: ${res.insertId}`);
    });
    callback(data);
  }

  return {
    read: dataRead,
    write: dataWrite,
  };
})();


// START SERVER
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Server running on port ${port}`);
});
