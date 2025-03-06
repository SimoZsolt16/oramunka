const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

app.use(cors());
app.use(bodyparser.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: 3307,
  password: "",
  database: "teliolimpia",
});

app.get("/", (req, res) => {
  res.send("Működik a szerver.");
});

app.get("/v", (req, res) => {
  const sql = "SELECT * FROM versenyzok";
  db.query(sql, (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

db.connect((err) => {
  if (err) {
    console.error("Hiba az adatbázishoz való kapcsolódáskor:", err);
  } else {
    console.log("Sikeres adatbázis kapcsolat!");
  }
});

app.get("/helyszin", (req, res) =>
{
  db.query("SELECT helyszin FROM sportagak", (err, results) =>
  {
    if (err)
    {
      res.status(500).send("Hiba történt az helyszínek lekérdezésekor");
      return;
    }

    res.json(results);
  });
});

app.get("/helyezes", (req, res) =>
{
  db.query("SELECT * FROM `rpgyorskorcsolyaeredmenyek` ORDER BY helyezes", (err, results) =>
  {
      if (err)
      {
          res.status(500)
          res.send("Hiba történt a magyar helyezések lekérdezésekor");

          return;
      }
      res.json(results);
    }
  );
});

app.get("/heleremszerzok", (req, res) => {
  db.query("SELECT * FROM `rpgyorskorcsolyaeredmenyek`", (err, results) =>
  {
    if (err)
    {
      res.status(500).send("Hiba történt a helyszínek lekérdezésekor");
      return;
    }
    
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log("A téliolimpia szervere a 3000-es porton fut.");
});