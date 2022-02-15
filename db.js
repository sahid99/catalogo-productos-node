var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'Sahid',
  port     : 8889,
  password : 'sahid99',
  database : 'catalogo'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


module.exports = connection;