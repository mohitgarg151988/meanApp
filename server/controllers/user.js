/**
 * Created by mohitgupta on 13/7/17.
 */

var express = require('express');
var router = express.Router();
var userApi = require('../models/user.js');

router.post('/getUser', function(req, res) {
    userApi.getByUserName(req.body.userName, function(err, data) {
        if(err)
            console.log(err);

        res.send(data);
    })
});

router.post("/login", function (req, res) {
    userApi.authenticate(req.body.userName, req.body.password, function (err, user) {
        if (user) {
            res.send(user);
        } else{
            res.send(err);
        }
    });
});

module.exports = router;