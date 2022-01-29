var mysql = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'sahid',
  password : 'sahid99',
  database: 'catalogo'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


module.exports = connection;