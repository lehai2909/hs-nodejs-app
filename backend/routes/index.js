var express = require("express");
var router = express.Router();
os = require("os");
const pg = require("pg");
const {Client} = pg;
require("dotenv").config();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {title: "Express"});
});

router.get("/api", function (req, res, next) {
  res.json({message: "API endpoint"});
});

router.post("/api/writedb", async function (req, res) {
  const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD, // Use env variable
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  });
  const new_email = req.body.email;
  const new_question = req.body.question;
  const current_time = new Date(); // Get current time

  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO questions (email, question, time) VALUES ($1, $2, $3)`,
      [new_email, new_question, current_time]
    );
    console.log(result);
    await client.end();
    res.status(200).json({service: "subscribe service", status: "ok"});
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Database error"});
  }
});

module.exports = router;
