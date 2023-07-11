const { Router } = require('express');
var utils = require('./Utils');
var express = require('express');
var bodyParser = require('body-parser');
const db = require('./configDb');
var appRouter = express.Router();
var jsonParser = bodyParser.json();

appRouter.get("/getCities", (req, resp) => {
  let sql = 'SELECT DISTINCT location FROM candidates';
  db.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      resp.status(500).send('An error occurred while fetching cities.');
    } else {
      const cities = result.map(city => city.location);
      resp.send(cities);
    }
  });
});

appRouter.get("/insertNewUser", (req, resp) => {
  const data = req.body;
  if (data.type === 'candidate') {
    const candidate = utils.splitFullNameAndCalcAge(data.data);
    console.log(candidate);
    let sql = 'INSERT INTO candidates SET ?';
    db.query(sql, candidate, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('Error Registering, Try Again');
      } else {
        resp.send("You're All Set!");
      }
    });
  } else if (data.type === 'employer') {
    const employer = utils.splitFullName(data.data);
    let sql = 'INSERT INTO employers SET ?';
    db.query(sql, employer, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('Error Registering, Try Again');
      } else {
        resp.send("You're All Set!");
      }
    });
  } else {
    resp.status(400).send('Invalid type provided.');
  }
});




module.exports = appRouter;