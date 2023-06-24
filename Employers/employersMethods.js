const { Router } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
const db = require('../configDb');
var appRouter = express.Router();
var jsonParser = bodyParser.json() 


appRouter.get("/getAll", (req, resp) => {
    let sql = 'SELECT * FROM employers';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while fetching employers.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.get("/getById/:id", (req, resp) => {
    let sql = `SELECT * FROM employers WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while fetching the employer.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.post("/insert", jsonParser, (req, resp) => {
    const employer = req.body;
    let sql = 'INSERT INTO employers SET ?';
    db.query(sql, employer, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while inserting the employer.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.post("/insertMulti", jsonParser, (req, resp) => {
    const employers = req.body;
    const results = [];
    employers.forEach((employer) => {
      let sql = 'INSERT INTO employers SET ?';
      db.query(sql, employer, (err, result) => {
        if (err) {
          console.error(err);
          console.log('Error inserting: ' + employer.name);
        } else {
          results.push(result);
          if (results.length === employers.length) {
            resp.send(results);
          }
        }
      });
    });
  });
  
  
  appRouter.put("/update/:id", jsonParser, (req, resp) => {
    const data = req.body;
    let sql = `UPDATE employers SET ? WHERE id = ${req.params.id}`;
    db.query(sql, data, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while updating the employer.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.delete("/delete/:id", (req, resp) => {
    const rowToDelete = req.params.id;
    let sql = `DELETE FROM employers WHERE id = ${rowToDelete}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while deleting the employer.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.delete("/deleteAll", (req, resp) => {
    let sql = 'DELETE FROM employers WHERE ID > 0';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while deleting all employers.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  
  
  
  
  





module.exports = appRouter;