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

// app.patch('/login/:id', (req, res) => {
//   const id = req.query.id;

//   console.log(id)
//   if(id){
//     var insSql = `SELECT * FROM accounts WHERE id= ${id}`;

//     mysqlConnection.query(insSql, function (err, result) {
//       if (err) {
//         res.send({ status: "NotOk", data: err })
//         throw err;
//       }
//       res.send({ status: "ok", data: result })
//     })
//   }

//   //login all if no id pass
//   // res.send('Hello, World!');
// });

app.patch('/login', (req, res) => {
  const id = req.query.id;

  console.log(id);
  if (id) {
    var insSql = `SELECT * FROM accounts WHERE id= ${id}`;

    mysqlConnection.query(insSql, function (err, result) {
      if (err) {
        res.send({ status: "NotOk", data: err });
        throw err;
      }
      res.send({ status: "ok", data: result });
    });
  } else {
    var insSql = `SELECT * FROM accounts`;

    mysqlConnection.query(insSql, function (err, result) {
      if (err) {
        res.send({ status: "NotOk", data: err });
        throw err;
      }
      res.send({ status: "ok", data: result });
    });
  }
});


app.patch('/api/accounts:id', (req, res) => {

  //update by id 
  res.send('Hello, World!');
});



app.delete('/api/accounts', (req, res) => {
  const id = req.query.id;

  console.log(id)
  const deleteSql = `DELETE FROM accounts WHERE id = ${id}`;

  mysqlConnection.query(deleteSql, [id], (err, result) => {
    if (err) {
      console.error('Error:', err);
      return res.status(500).send({ status: "NotOk", message: "Error deleting account", error: err });

    }
    return res.status(200).send({ status: "Ok", data: result })
  });
});

app.get('/api/accounts', (req, res) => {

  var insSql = `SELECT * FROM accounts`;

  mysqlConnection.query(insSql, function (err, result) {
    if (err) {
      res.send({ status: "NotOk", data: err })
      throw err;
    }
    res.send({ status: "ok", data: result })
  })

  //get all accouts 
});

app.post('/api/accounts', (req, res) => {

  // console.log('body', req.body)
  let name = req.body.name;
  let accountId = req.body.accountId;
  let password = req.body.password;
  let apiKey = req.body.apiKey;
  let totpSecret = req.body.totpSecret;

  var insSql = `INSERT INTO copytrade.accounts (name, accountId, password, apiKey, totpSecret) VALUES('${name}', '${accountId}', '${password}', '${apiKey}', '${totpSecret}')`;
  console.log('insSql', insSql)

  mysqlConnection.query(insSql, function (err, insertResult) {
    if (err) {
      res.send({ status: "NotOk", data: err })
      throw err;
    }
    console.log("Record INSERTED ", insertResult);
    res.send({ status: "ok", data: insertResult })
  });

});
