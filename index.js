const express = require('express');
const cors = require('cors');
const db = require('./configDB.js');

const app = express();
app.use(cors());

var candidateController = require('./Candidates/CandidatesMethods');
var EmployerController = require('./Employers/EmployersMethods');
var advancedController = require('./AdvancedMethods');

// Your server code goes here

app.listen(3000, () => {
    console.log('Server is running on port 3000.');
});

app.use('/candidates', candidateController);
app.use('/employers', EmployerController);
app.use('/advanced', advancedController);
