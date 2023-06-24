const { Router } = require('express');
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

  

module.exports = appRouter;