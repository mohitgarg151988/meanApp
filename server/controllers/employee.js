/**
 * Created by mohitgupta on 12/7/17.
 */

var express = require('express');
var router = express.Router();
var employeeApi = require('../models/employee.js');

router.get('/getEmployee', function(req, res) {
    employeeApi.getAll(function(err, data) {
        console.log(err);
        res.send(data);
    })
});

module.exports = router;