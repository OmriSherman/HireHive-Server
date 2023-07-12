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


appRouter.post('/loginUser', jsonParser, (req, resp) => {
  const { email, password } = req.body;

  let candidatesQuery = `SELECT * FROM candidates WHERE email='${email}' AND password='${password}'`;
  db.query(candidatesQuery, (err1, result1) => {
    if (err1) {
      console.error(err1);
      resp.status(500).send('An error occurred while logging in.');
    } else if (result1.length > 0) {
      resp.json(result1[0]);
    } else {
      let employersQuery = `SELECT * FROM employers WHERE email='${email}' AND password='${password}'`;
      db.query(employersQuery, (err2, result2) => {
        if (err2) {
          console.error(err2);
          resp.status(500).send('An error occurred while logging in.');
        } else if (result2.length > 0) {
          resp.json(result2[0]);
        } else {
          resp.status(400).send('Invalid email or password.');
        }
      });
    }
  });
});

// appRouter.post("/loginUser", jsonParser, async (req, resp) => {
//   try {
//     const { email, password } = req.body;
//     const candidateQuery = `SELECT * FROM candidates WHERE email=? AND password=?`;
//     const employerQuery = `SELECT * FROM employers WHERE email=? AND password=?`;

//     // Check in candidates table
//     const candidateResult = await db.query(candidateQuery, [email, password]);
//     if (candidateResult.length > 0) {
//       return resp.json(candidateResult);
//     }

//     // Check in employers table
//     const employerResult = await db.query(employerQuery, [email, password]);
//     if (employerResult.length > 0) {
//       return resp.json(employerResult);
//     }

//     // Neither candidate nor employer found
//     return resp.status(404).json({ error: 'Invalid email or password' });
//   } catch (err) {
//     console.error(err);
//     return resp.status(500).send('An error occurred while logging in');
//   }
// });



module.exports = appRouter;