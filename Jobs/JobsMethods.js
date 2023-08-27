const { Router } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
const db = require('../configDb');
var appRouter = express.Router();
var jsonParser = bodyParser.json() 


appRouter.get("/getAll", (req, resp) => {
    let sql = 'SELECT * FROM jobs';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while fetching jobs.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.get("/getById/:id", (req, resp) => {
    let sql = `SELECT * FROM jobs WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while fetching the job.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.post("/insert", jsonParser, (req, resp) => {
    const job = req.body;
    let sql = 'INSERT INTO jobs SET ?';
    db.query(sql, job, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while inserting the job.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.post("/insertMulti", jsonParser, (req, resp) => {
    const jobs = req.body;
    const results = [];
    let completed = 0;
    
    const processResult = (err, result) => {
      if (err) {
        console.error('Error inserting job:', err);
      } else {
        results.push(result);
      }
      
      completed++;
      if (completed === jobs.length) {
        resp.send(results);
      }
    };
    
    jobs.forEach(job => {
      let sql = 'INSERT INTO jobs SET ?';
      db.query(sql, job, processResult);
    });
  });
  
  appRouter.put("/update/:id", jsonParser, (req, resp) => {
    const data = req.body;
    let sql = `UPDATE jobs SET ? WHERE id = ${req.params.id}`;
    db.query(sql, data, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while updating the job.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.delete("/delete/:id", (req, resp) => {
    const rowToDelete = req.params.id;
    let sql = `DELETE FROM jobs WHERE id = ${rowToDelete}`;
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while deleting the job.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
  appRouter.delete("/deleteAll", (req, resp) => {
    let sql = 'DELETE FROM jobs WHERE ID > 0';
    db.query(sql, (err, result) => {
      if (err) {
        console.error(err);
        resp.status(500).send('An error occurred while deleting all jobs.');
      } else {
        resp.send(result);
      }
    });
  });
  
  
module.exports = appRouter;