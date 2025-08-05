var express = require("express");
var router = express.Router();
os = require("os");
const pg = require("pg");
const {Client} = pg;
// require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {title: "Express"});
});

router.get("/api", function (req, res, next) {
  res.json({message: "API endpoint"});
});

router.post("/api/writedb", function (req, res) {
  const client = new Client({
    user: "postgres",
    password: "Postgres123!@#",
    host: "35.197.129.187",
    // host: "localhost",
    port: 5432,
    database: "app",
  });
  const new_email = req.body.email;
  const new_question = req.body.question;
  console.log(new_email);
  console.log(new_question);
  try {
    async function insertDB() {
      await client.connect();
      const res = await client.query(
        `INSERT INTO users (email, question) VALUES ('${new_email}', '${new_question}')`
      );
      console.log(res);
      await client.end();
    }

    insertDB();
    res.status(200).json({service: "subscribe service", status: "ok"});
  } catch (err) {
    console.error(err);
    res.status(404);
  }
  // async function insertDB() {
  //   await client.connect();
  //   const res = await client.query(
  //     `INSERT INTO questions (email, question) VALUES ('${new_email}', '${new_question}')`
  //   );
  //   console.log(res);
  //   await client.end();
  // }

  // insertDB();
  // res.status(200).json({service: "subscribe service", status: "ok"});
});

module.exports = router;
