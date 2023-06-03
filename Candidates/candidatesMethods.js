const { Router } = require('express');
var express = require('express');
var bodyParser = require('body-parser');
const db = require('../configDb');
var appRouter = express.Router();
var jsonParser = bodyParser.json() 


appRouter.get("/getAll",(req,resp) => {
    let sql = 'SELECT * FROM candidates';
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.get("/getById/:id",(req,resp) => {
    let sql = `SELECT * FROM candidates WHERE id = ${req.params.id}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})


appRouter.post("/insert",jsonParser,(req,resp) => {
    const candidate = req.body;
    let sql = 'INSERT INTO candidates SET ?';
    db.query(sql,candidate, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.post("/insertMulti",jsonParser,(req,resp) => {
    const candidates = req.body;
    const results = [];
    candidates.forEach(candidate => {
        let sql = 'INSERT INTO candidates SET ?';
        db.query(sql,candidate, (err,result)=> {
            if(err) {
                console.log('error inserting: ' + candidate.first_name + candidate.last_name);
            } 
            results.push(result);
            if (results.length === candidates.length) {
                resp.send(results);
            }
        });
    });
})

appRouter.put("/update/:id",jsonParser,(req,resp) => {
    const data = req.body;
    console.log(data);
    let sql = `UPDATE candidates SET ? WHERE id = ${req.params.id}`;
    db.query(sql, data, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });

})

appRouter.delete("/delete/:id",(req,resp) => {
    const rowToDelete = req.params.id;
    let sql = `DELETE FROM candidates WHERE id = ${rowToDelete}`;
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.delete("/deleteAll",(req,resp) => {
    let sql = 'DELETE FROM candidates WHERE ID > 0';
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        resp.send(result);
    });
})

appRouter.get("/getCities",(req,resp) => {
    let sql = 'SELECT DISTINCT location FROM candidates';
    db.query(sql, (err,result)=> {
        if(err) throw(err);
        const cities = result.map(city => city.location);
        resp.send(cities);
    });
})



module.exports = appRouter;