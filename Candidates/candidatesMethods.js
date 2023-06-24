const { Router } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
const db = require('../configDb');
var appRouter = express.Router();
var jsonParser = bodyParser.json() 


appRouter.get("/getAll", (req, resp) => {
    let sql = 'SELECT * FROM candidates';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while fetching candidates.');
      } else {
        resp.send(result);
      }
    });
  });
  
  appRouter.get("/getById/:id", (req, resp) => {
    let sql = `SELECT * FROM candidates WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while fetching the candidate.');
      } else {
        resp.send(result);
      }
    });
  });
  
  appRouter.post("/insert", jsonParser, (req, resp) => {
    const candidate = req.body;
    let sql = 'INSERT INTO candidates SET ?';
    db.query(sql, candidate, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while inserting the candidate.');
      } else {
        resp.send(result);
      }
    });
  });
  
  appRouter.post("/insertMulti", jsonParser, (req, resp) => {
    const candidates = req.body;
    const results = [];
    let completed = 0;
    
    const processResult = (err, result) => {
      if (err) {
        console.error('Error inserting candidate:', err);
      } else {
        results.push(result);
      }
      
      completed++;
      if (completed === candidates.length) {
        resp.send(results);
      }
    };
    
    candidates.forEach(candidate => {
      let sql = 'INSERT INTO candidates SET ?';
      db.query(sql, candidate, processResult);
    });
  });
  
  appRouter.put("/update/:id", jsonParser, (req, resp) => {
    const data = req.body;
    let sql = `UPDATE candidates SET ? WHERE id = ${req.params.id}`;
    db.query(sql, data, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while updating the candidate.');
      } else {
        resp.send(result);
      }
    });
  });
  
  appRouter.delete("/delete/:id", (req, resp) => {
    const rowToDelete = req.params.id;
    let sql = `DELETE FROM candidates WHERE id = ${rowToDelete}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while deleting the candidate.');
      } else {
        resp.send(result);
      }
    });
  });
  
  appRouter.delete("/deleteAll", (req, resp) => {
    let sql = 'DELETE FROM candidates WHERE ID > 0';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while deleting all candidates.');
      } else {
        resp.send(result);
      }
    });
  });
  
 
  


module.exports = appRouter;