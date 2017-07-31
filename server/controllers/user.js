/**
 * Created by mohitgupta on 13/7/17.
 */

var express = require('express');
var router = express.Router();
var userApi = require('../models/user.js');
var jwt = require('jsonwebtoken');
var cfj = require('../config/config.js');


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
            var payload = {id: user._id};
            var token = jwt.sign(payload, cfj.jwtSecret);
            //res.cookie('auth', token);
            res.json({
                success: true,
                message: 'Enjoy your token!',
                token: token
            });
        } else{
            res.json({ success: false, message: err });
        }
    });
});

router.post("/register", function (req, res) {
    userApi.registeration(req.body, function (err, user) {
        if(user) {
            res.json({
                success: true,
                message: 'User Registered Successfully!'
            });
        } else{
            res.json({ success: false, message: err })
        }
    });
});

module.exports = router;