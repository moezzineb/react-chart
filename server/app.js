const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

// props
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Connect to SQL DB
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_charts"
});
// Test connection
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", function (req, res) {
  res.send("Hello World!");
});

// Get chart data
app.get("/getData/:category/:type", function (req, res) {
  let category = req.params.category;
  let type = req.params.type;

  connection.query(
    "SELECT * FROM `charts` WHERE `category` = ? AND `category` = ?",
    [category, type],
    function (error, results, fields) {
      if (error) console.log(error);
      res.send(results);
    }
  );

});

// Send chart data
app.post("/sendData", function (req, res) {
  let paramz = [
    [
      req.body.category, 
      req.body.type, 
      req.body.data, 
      req.body.title, 
      req.body.axex, 
      req.body.axey
    ]
  ];
  connection.query(
    "INSERT INTO charts (category,type,data,title,axex,axey) VALUES ?",
    [paramz],
    function (error, results, fields) {
      if (error) throw error;
      res.send(results);
    }
  );
});

app.listen(5000, function () {
  console.log("Example app listening on port 5000!");
});