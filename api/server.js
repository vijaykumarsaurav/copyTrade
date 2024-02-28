const express = require('express');
const app = express();
var mysql = require('mysql');
var cors = require('cors');

const port = 9000;
let bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

app.use(express.json());
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "copytrade",
    port: 3306
});

mysqlConnection.connect(function (err) {
    if (err) throw err;
    console.log("Mysql Connected in server.js :) ");
});


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/users', (req, res) => {
    res.json([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' }
    ]);
  });
  
app.post('/api/users', (req, res) => {

   // console.log('body', req.body)
    let name = req.body.name; 
    let accountId = req.body.accountId; 
    let password = req.body.password; 
    let apiKey = req.body.apiKey; 
    let totpSecret = req.body.totpSecret; 

    var insSql = `INSERT INTO copytrade.users (name, accountId, password, apiKey, totpSecret) VALUES('${name}', '${accountId}', '${password}', '${apiKey}', '${totpSecret}')`; 
    console.log('insSql', insSql)

    mysqlConnection.query(insSql, function (err, insertResult) {
      if (err) {
        res.send({ status: "NotOk", data: err })
        throw err;
      }
      console.log("Record INSERTED ",insertResult);
      res.send({ status: "ok", data: insertResult })
    });

});
